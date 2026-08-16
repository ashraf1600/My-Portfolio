import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import TypewriterTerminal from './components/TypewriterTerminal.vue'
import SidebarToggle from './components/SidebarToggle.vue'
import { h, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(SidebarToggle)
    })
  },
  enhanceApp({ app }) {
    app.component('TypewriterTerminal', TypewriterTerminal)
    app.component('SidebarToggle', SidebarToggle)
  },
  setup() {
    const route = useRoute()

    const fixPortfolioLinks = () => {
      if (typeof window === 'undefined') return
      const links = document.querySelectorAll('a')
      links.forEach(a => {
        if (a.textContent && a.textContent.includes('Portfolio')) {
          a.setAttribute('href', '/')
          a.onclick = (e) => {
            e.preventDefault()
            window.location.href = '/'
          }
        }
      })
    }

    onMounted(() => {
      fixPortfolioLinks()
    })

    watch(() => route.path, () => {
      setTimeout(fixPortfolioLinks, 100)
    })
  }
} satisfies Theme