<template>
  <button 
    class="sidebar-toggle-btn" 
    :class="{ 'is-collapsed': isCollapsed }"
    @click="toggleSidebar"
    title="Toggle Sidebar (Alt + S)"
    aria-label="Toggle Sidebar Panel"
  >
    <svg v-if="!isCollapsed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <polyline points="14 9 11 12 14 15"></polyline>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <polyline points="11 9 14 12 11 15"></polyline>
    </svg>
    <span class="btn-text">{{ isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar' }}</span>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isCollapsed = ref(false)

const applyState = (collapsed) => {
  if (typeof document === 'undefined') return
  if (collapsed) {
    document.documentElement.classList.add('hide-sidebar-panel')
  } else {
    document.documentElement.classList.remove('hide-sidebar-panel')
  }
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  applyState(isCollapsed.value)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('doc-sidebar-collapsed', isCollapsed.value ? 'true' : 'false')
  }
}

const handleKeyDown = (e) => {
  if (e.altKey && (e.key === 's' || e.key === 'S')) {
    e.preventDefault()
    toggleSidebar()
  }
}

onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('doc-sidebar-collapsed')
    if (saved === 'true') {
      isCollapsed.value = true
      applyState(true)
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<style scoped>
.sidebar-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  margin-left: 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.sidebar-toggle-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.sidebar-toggle-btn.is-collapsed {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border-color: var(--vp-c-brand-1);
}

@media (max-width: 960px) {
  .btn-text {
    display: none;
  }
  .sidebar-toggle-btn {
    padding: 6px;
    border-radius: 50%;
  }
}
</style>
