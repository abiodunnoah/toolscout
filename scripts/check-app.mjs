import { existsSync } from 'node:fs'
import { chromium } from 'playwright-core'

const BASE = process.env.BASE ?? 'http://localhost:4173'

const candidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean)

const executablePath = candidates.find((path) => existsSync(path))

if (!executablePath) {
  console.error('Chrome was not found. Set CHROME_PATH and run again.')
  process.exit(1)
}

const results = []
function check(ok, message) {
  results.push(ok)
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${message}`)
}

const browser = await chromium.launch({ executablePath, headless: true })
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  colorScheme: 'dark',
})
const page = await context.newPage()

try {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)

  await page.keyboard.press('Tab')
  const first = await page.evaluate(() => {
    const el = document.activeElement
    return { text: el.textContent.trim(), width: el.getBoundingClientRect().width }
  })
  check(
    first.text === 'Skip to content' && first.width > 0,
    `First Tab shows the skip link (${first.text})`,
  )

  let reachedSearch = false
  for (let i = 0; i < 15; i += 1) {
    await page.keyboard.press('Tab')
    const id = await page.evaluate(() => document.activeElement.id)
    if (id === 'tool-search') {
      reachedSearch = true
      break
    }
  }
  check(reachedSearch, 'Search field is reachable with Tab')

  const focus = await page.evaluate(() => {
    const style = getComputedStyle(document.activeElement)
    return { style: style.outlineStyle, width: style.outlineWidth }
  })
  check(
    focus.style !== 'none' && parseFloat(focus.width) >= 2,
    `Focused field has a visible outline (${focus.style} ${focus.width})`,
  )

  await page.keyboard.type('summarise')
  const countText = await page.locator('[role="status"]').first().textContent()
  check(/tool/.test(countText), `Typing updates the live result count (${countText.trim()})`)

  const chip = page.getByRole('button', { name: 'Research', exact: true })
  await chip.focus()
  const before = await chip.getAttribute('aria-pressed')
  await page.keyboard.press('Enter')
  const after = await chip.getAttribute('aria-pressed')
  check(before !== after, `Filter chip toggles with Enter (${before} -> ${after})`)
  await page.keyboard.press('Enter')

  await page.goto(`${BASE}/tool/chatpdf`, { waitUntil: 'networkidle' })
  check(
    (await page.locator('h1').textContent()).trim() === 'ChatPDF',
    'Deep link /tool/chatpdf renders the tool',
  )
  check(
    (await page.title()).includes('ChatPDF'),
    `Page title names the tool (${await page.title()})`,
  )

  let save = page.getByRole('button', { name: /^Save/ }).first()
  await save.focus()
  await page.keyboard.press('Enter')
  check(
    (await save.getAttribute('aria-pressed')) === 'true',
    'Save works from the keyboard and updates aria-pressed',
  )
  await page.reload({ waitUntil: 'networkidle' })
  check(
    (await page.getByRole('button', { name: 'Saved' }).getAttribute('aria-pressed')) === 'true',
    'Saved state survives a reload',
  )

  await page.goto(`${BASE}/tool/elicit`, { waitUntil: 'networkidle' })
  save = page.getByRole('button', { name: /^Save/ }).first()
  await save.click()

  await page.goto(`${BASE}/saved`, { waitUntil: 'networkidle' })
  check(
    (await page.locator('body').innerText()).includes('ChatPDF'),
    '/saved lists the shortlist',
  )

  const checkboxes = page.getByRole('checkbox')
  check((await checkboxes.count()) === 2, 'Two saved tools offer compare checkboxes')
  await checkboxes.nth(0).check()
  await checkboxes.nth(1).check()
  const compareButton = page.getByRole('button', { name: /Compare 2 selected/ })
  check(await compareButton.isEnabled(), 'Compare button enables after two picks')
  await compareButton.focus()
  await page.keyboard.press('Enter')
  await page.waitForURL(/\/compare\?ids=/)
  check(page.url().includes('/compare?ids='), `Compare link is deep-linkable (${page.url()})`)
  check((await page.locator('table').count()) === 1, 'Compare page renders a real table')

  const remove = page.getByRole('button', { name: /Remove .* from the comparison/ }).first()
  await remove.focus()
  await page.keyboard.press('Enter')
  await page.waitForURL(/\/compare(\?|$)/)
  check(
    (await page.evaluate(() => document.activeElement.id)) === 'compare-heading',
    'Focus moves to the heading after removing a column',
  )

  await page.goto(`${BASE}/nope`, { waitUntil: 'networkidle' })
  check(
    (await page.locator('h1').innerText()).includes("can't find that page"),
    'Unknown path renders the 404 view',
  )

  const mobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    colorScheme: 'light',
  })
  const small = await mobile.newPage()
  for (const path of ['/', '/tool/chatpdf', '/saved', '/compare?ids=chatpdf,elicit']) {
    await small.goto(BASE + path, { waitUntil: 'networkidle' })
    const overflow = await small.evaluate(
      () => document.body.scrollWidth - document.documentElement.clientWidth,
    )
    check(overflow <= 1, `No horizontal page scroll at 375px on ${path} (${overflow}px)`)
  }
  await mobile.close()
} finally {
  await browser.close()
}

const failed = results.filter((ok) => !ok).length
console.log(`\n${results.length - failed}/${results.length} checks passed`)
process.exit(failed ? 1 : 0)

