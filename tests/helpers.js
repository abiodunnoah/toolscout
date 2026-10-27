import { createMemoryHistory, createRouter } from 'vue-router'

/** A tiny router so components that render RouterLink can mount in tests. */
export function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div />' } },
      { path: '/tool/:id', name: 'tool', component: { template: '<div />' } },
      { path: '/saved', name: 'saved', component: { template: '<div />' } },
      { path: '/compare', name: 'compare', component: { template: '<div />' } },
    ],
  })
}

/** A complete record, so a test only has to override the fields it cares about. */
export function makeTool(overrides = {}) {
  return {
    id: 'chatpdf',
    name: 'ChatPDF',
    category: 'Research',
    price: 'Freemium',
    freeTier: true,
    studentFriendly: true,
    pricingNote: 'Free tier with daily limits',
    tagline: 'Chat with any PDF',
    description: 'Upload a paper and ask questions in plain language.',
    tasks: ['summarise a PDF'],
    tags: ['pdf', 'research'],
    bestFor: 'Students skimming long papers',
    platforms: ['Web'],
    features: ['Chat with PDFs'],
    pros: ['Fast to start'],
    limitations: ['Daily page limit'],
    editorScore: 4.2,
    url: 'https://www.chatpdf.com',
    updatedAt: '2026-10-19',
    ...overrides,
  }
}
