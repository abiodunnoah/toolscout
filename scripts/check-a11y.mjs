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

const PAGES = ['/', '/tool/chatpdf', '/saved', '/compare?ids=chatpdf,elicit', '/nope']

const browser = await chromium.launch({ executablePath, headless: true })
let failures = 0

for (const scheme of ['dark', 'light']) {
  const context = await browser.newContext({
    colorScheme: scheme,
    viewport: { width: 1280, height: 900 },
  })
  const page = await context.newPage()
  const consoleProblems = []

  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      consoleProblems.push(`${message.type()}: ${message.text()}`)
    }
  })
  page.on('pageerror', (error) => consoleProblems.push(`pageerror: ${error.message}`))

  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' })

    const violations = await page.evaluate(async () => {
      const report = await window.axe.run(document, {
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
      })
      return report.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target.join(' ')),
      }))
    })

    if (violations.length) {
      failures += violations.length
      console.log(`FAIL [${scheme}] ${path}`)
      for (const violation of violations) {
        console.log(`  ${violation.id} (${violation.impact}): ${violation.nodes.join(' | ')}`)
      }
    } else {
      console.log(`PASS [${scheme}] ${path}`)
    }
  }

  const unique = [...new Set(consoleProblems)]
  if (unique.length) {
    failures += unique.length
    console.log(`FAIL console [${scheme}]`)
    for (const problem of unique) console.log('  ' + problem)
  } else {
    console.log(`PASS console [${scheme}] no errors or warnings`)
  }

  await context.close()
}

await browser.close()
console.log(`\n${failures === 0 ? 'ALL AXE AND CONSOLE CHECKS PASSED' : failures + ' FAILURES'}`)
process.exit(failures ? 1 : 0)
