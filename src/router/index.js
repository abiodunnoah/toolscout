import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import HomeView from '../views/HomeView.vue'
import ToolDetailView from '../views/ToolDetailView.vue'
import SavedView from '../views/SavedView.vue'
import CompareView from '../views/CompareView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Find an AI tool for your task' },
  },
  {
    path: '/tool/:id',
    name: 'tool',
    component: ToolDetailView,
    props: true,
    meta: { title: 'Tool details' },
  },
  {
    path: '/saved',
    name: 'saved',
    component: SavedView,
    meta: { title: 'Your shortlist' },
  },
  {
    path: '/compare',
    name: 'compare',
    component: CompareView,
    meta: { title: 'Compare tools' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page not found' },
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // A query-only change (for example, removing a compare column) keeps the page in place.
    if (to.path === from.path) return false
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach(async (to, from) => {
  document.title = to.meta.title ? `${to.meta.title} · ToolScout` : 'ToolScout'

  // A single-page app changes the page without a reload. Move focus to the main
  // region so keyboard and screen-reader users start at the new content.
  // Skip the first load: the page starts at the top and Tab should reach the skip link.
  if (!from.matched.length || to.name === from.name) return
  await nextTick()
  document.getElementById('main')?.focus({ preventScroll: true })
})
