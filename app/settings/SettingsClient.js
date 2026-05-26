'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const DEFAULT_LAYOUTS = {
  mods: 'rows',
  plugins: 'rows',
  datapacks: 'rows',
  shaders: 'grid',
  resourcepacks: 'grid',
  modpacks: 'rows',
  servers: 'grid',
  profiles: 'rows'
}

const LAYOUT_CATEGORIES = [
  { id: 'mods', name: 'Страница модов' },
  { id: 'plugins', name: 'Страница плагинов' },
  { id: 'datapacks', name: 'Страница датапаков' },
  { id: 'shaders', name: 'Страница шейдеров' },
  { id: 'resourcepacks', name: 'Страница ресурспаков' },
  { id: 'modpacks', name: 'Страница сборок' },
  { id: 'servers', name: 'Страница серверов' },
  { id: 'profiles', name: 'Профили пользователей' }
]

export default function SettingsClient() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [toggles, setToggles] = useState({
    'advanced-rendering': true,
    'external-links-new-tab': true,
    'search-sidebar-right': false,
    'project-sidebar-left': false
  })
  
  const [layouts, setLayouts] = useState(DEFAULT_LAYOUTS)

  useEffect(() => {
    const loadSettings = () => {
      const newToggles = {
        'advanced-rendering': localStorage.getItem('advanced-rendering') !== 'false',
        'external-links-new-tab': localStorage.getItem('external-links-new-tab') !== 'false',
        'search-sidebar-right': localStorage.getItem('search-sidebar-right') === 'true',
        'project-sidebar-left': localStorage.getItem('project-sidebar-left') === 'true'
      }
      setToggles(newToggles)

      const savedLayouts = localStorage.getItem('project-list-layouts')
      if (savedLayouts) {
        try {
          setLayouts({ ...DEFAULT_LAYOUTS, ...JSON.parse(savedLayouts) })
        } catch (e) {}
      }
    }

    loadSettings()
    setMounted(true)
  }, [])

  const handleToggle = (key) => {
    const newValue = !toggles[key]
    setToggles(prev => ({ ...prev, [key]: newValue }))
    localStorage.setItem(key, newValue ? 'true' : 'false')

    const html = document.documentElement
    if (key === 'advanced-rendering') {
      if (newValue) html.classList.remove('no-advanced-rendering')
      else html.classList.add('no-advanced-rendering')
    } else if (key === 'search-sidebar-right') {
      if (newValue) html.classList.add('search-sidebar-right')
      else html.classList.remove('search-sidebar-right')
    } else if (key === 'project-sidebar-left') {
      if (newValue) html.classList.add('project-sidebar-left')
      else html.classList.remove('project-sidebar-left')
    }
  }

  const handleLayoutChange = (catId, mode) => {
    const newLayouts = { ...layouts, [catId]: mode }
    setLayouts(newLayouts)
    localStorage.setItem('project-list-layouts', JSON.stringify(newLayouts))

    window.dispatchEvent(new Event('layout-settings-changed'))
  }

  const handleResetAll = () => {
    setIsResetting(true)
    localStorage.clear()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-48 bg-modrinth-dark border border-gray-800 rounded-2xl"></div>
        <div className="h-96 bg-modrinth-dark border border-gray-800 rounded-2xl"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="universal-card" aria-labelledby="color-theme-heading">
        <h2 id="color-theme-heading" className="text-xl font-bold text-white mb-1">Цветовая тема</h2>
        <p className="text-gray-400 mb-6 text-xs md:text-sm">Выберите предпочтительную цветовую тему для ModrinthProxy на этом устройстве.</p>
        
        <div className="theme-options">
          {/* Синхронизация с системой */}
          <button
            onClick={() => setTheme('system')}
            className={`preview-radio ${theme === 'system' ? 'selected' : ''}`}
            aria-label="Синхронизация с системой"
          >
            <div className="preview system-mode">
              <div className="example-card">
                <div className="example-icon" />
                <div className="example-text-1" />
                <div className="example-text-2" />
              </div>
            </div>
            <div className="label">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="radio shrink-0">
                {theme === 'system' ? (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                  </>
                ) : (
                  <circle cx="12" cy="12" r="10" />
                )}
              </svg>
              Система
            </div>
          </button>

          {/* Светлая */}
          <button
            onClick={() => setTheme('light')}
            className={`preview-radio ${theme === 'light' ? 'selected' : ''}`}
            aria-label="Светлая тема"
          >
            <div className="preview light-mode">
              <div className="example-card">
                <div className="example-icon" />
                <div className="example-text-1" />
                <div className="example-text-2" />
              </div>
            </div>
            <div className="label">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="radio shrink-0">
                {theme === 'light' ? (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                  </>
                ) : (
                  <circle cx="12" cy="12" r="10" />
                )}
              </svg>
              Светлая
            </div>
          </button>

          {/* Тёмная */}
          <button
            onClick={() => setTheme('dark')}
            className={`preview-radio ${theme === 'dark' ? 'selected' : ''}`}
            aria-label="Тёмная тема"
          >
            <div className="preview dark-mode">
              <div className="example-card">
                <div className="example-icon" />
                <div className="example-text-1" />
                <div className="example-text-2" />
              </div>
            </div>
            <div className="label">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="radio shrink-0">
                {theme === 'dark' ? (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                  </>
                ) : (
                  <circle cx="12" cy="12" r="10" />
                )}
              </svg>
              Тёмная
            </div>
          </button>
        </div>
      </section>

      <section className="universal-card" aria-labelledby="toggle-features-heading">
        <h2 id="toggle-features-heading" className="text-xl font-bold text-white mb-1">Настройка функций</h2>
        <p className="text-gray-400 mb-6 text-xs md:text-sm">Включение или отключение определенных функций на этом устройстве.</p>
        
        <div className="flex flex-col gap-6">
          {/* Advanced rendering */}
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <label htmlFor="advanced-rendering" className="flex-1 cursor-pointer select-none">
              <span className="block font-semibold text-white text-sm md:text-base">Визуальные эффекты</span>
              <span className="text-gray-400 text-xs md:text-sm">Включает размытие меню и фоновые изображения на страницах проектов. Отключите для ускорения работы сайта на слабых устройствах.</span>
            </label>
            <button
              id="advanced-rendering"
              type="button"
              role="switch"
              aria-checked={toggles['advanced-rendering']}
              onClick={() => handleToggle('advanced-rendering')}
              className={`group inline-flex shrink-0 items-center rounded-full m-0 p-1 transition-all duration-200 cursor-pointer border-none h-6 !w-[48px] ${
                toggles['advanced-rendering'] ? 'bg-modrinth-green' : 'bg-[#ced4da] dark:bg-[#2a2d32]'
              }`}
            >
              <span className={`rounded-full transition-all duration-200 w-4 h-4 ${
                toggles['advanced-rendering'] 
                  ? 'translate-x-[24px] bg-white dark:bg-[#111111] group-hover:w-[18px] group-hover:h-[18px] group-hover:m-[-1px] group-active:w-[14px] group-active:h-[14px] group-active:m-[1px]' 
                  : 'translate-x-0 bg-white dark:bg-[#a1a1aa] group-hover:w-[18px] group-hover:h-[18px] group-hover:m-[-1px] group-active:w-[14px] group-active:h-[14px] group-active:m-[1px]'
              }`} />
            </button>
          </div>

          {/* Open external links in new tab */}
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <label htmlFor="external-links-new-tab" className="flex-1 cursor-pointer select-none">
              <span className="block font-semibold text-white text-sm md:text-base">Внешние ссылки в новой вкладке</span>
              <span className="text-gray-400 text-xs md:text-sm">Настроить открытие внешних ссылок (ведущих за пределы сайта) в новой вкладке. Независимо от этой настройки, ссылки на одном домене и в описаниях Markdown всегда будут открываться в текущей вкладке.</span>
            </label>
            <button
              id="external-links-new-tab"
              type="button"
              role="switch"
              aria-checked={toggles['external-links-new-tab']}
              onClick={() => handleToggle('external-links-new-tab')}
              className={`group inline-flex shrink-0 items-center rounded-full m-0 p-1 transition-all duration-200 cursor-pointer border-none h-6 !w-[48px] ${
                toggles['external-links-new-tab'] ? 'bg-modrinth-green' : 'bg-[#ced4da] dark:bg-[#2a2d32]'
              }`}
            >
              <span className={`rounded-full transition-all duration-200 w-4 h-4 ${
                toggles['external-links-new-tab'] 
                  ? 'translate-x-[24px] bg-white dark:bg-[#111111] group-hover:w-[18px] group-hover:h-[18px] group-hover:m-[-1px] group-active:w-[14px] group-active:h-[14px] group-active:m-[1px]' 
                  : 'translate-x-0 bg-white dark:bg-[#a1a1aa] group-hover:w-[18px] group-hover:h-[18px] group-hover:m-[-1px] group-active:w-[14px] group-active:h-[14px] group-active:m-[1px]'
              }`} />
            </button>
          </div>

          {/* Right-aligned filters sidebar */}
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <label htmlFor="search-layout-toggle" className="flex-1 cursor-pointer select-none">
              <span className="block font-semibold text-white text-sm md:text-base">Панель фильтров поиска справа</span>
              <span className="text-gray-400 text-xs md:text-sm">Отображать боковую панель фильтров справа от результатов поиска.</span>
            </label>
            <button
              id="search-layout-toggle"
              type="button"
              role="switch"
              aria-checked={toggles['search-sidebar-right']}
              onClick={() => handleToggle('search-sidebar-right')}
              className={`group inline-flex shrink-0 items-center rounded-full m-0 p-1 transition-all duration-200 cursor-pointer border-none h-6 !w-[48px] ${
                toggles['search-sidebar-right'] ? 'bg-modrinth-green' : 'bg-[#ced4da] dark:bg-[#2a2d32]'
              }`}
            >
              <span className={`rounded-full transition-all duration-200 w-4 h-4 ${
                toggles['search-sidebar-right'] 
                  ? 'translate-x-[24px] bg-white dark:bg-[#111111] group-hover:w-[18px] group-hover:h-[18px] group-hover:m-[-1px] group-active:w-[14px] group-active:h-[14px] group-active:m-[1px]' 
                  : 'translate-x-0 bg-white dark:bg-[#a1a1aa] group-hover:w-[18px] group-hover:h-[18px] group-hover:m-[-1px] group-active:w-[14px] group-active:h-[14px] group-active:m-[1px]'
              }`} />
            </button>
          </div>

          {/* Left-aligned sidebar on content pages */}
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <label htmlFor="project-layout-toggle" className="flex-1 cursor-pointer select-none">
              <span className="block font-semibold text-white text-sm md:text-base">Боковая панель контента слева</span>
              <span className="text-gray-400 text-xs md:text-sm">Отображать боковую панель слева от основного описания проекта.</span>
            </label>
            <button
              id="project-layout-toggle"
              type="button"
              role="switch"
              aria-checked={toggles['project-sidebar-left']}
              onClick={() => handleToggle('project-sidebar-left')}
              className={`group inline-flex shrink-0 items-center rounded-full m-0 p-1 transition-all duration-200 cursor-pointer border-none h-6 !w-[48px] ${
                toggles['project-sidebar-left'] ? 'bg-modrinth-green' : 'bg-[#ced4da] dark:bg-[#2a2d32]'
              }`}
            >
              <span className={`rounded-full transition-all duration-200 w-4 h-4 ${
                toggles['project-sidebar-left'] 
                  ? 'translate-x-[24px] bg-white dark:bg-[#111111] group-hover:w-[18px] group-hover:h-[18px] group-hover:m-[-1px] group-active:w-[14px] group-active:h-[14px] group-active:m-[1px]' 
                  : 'translate-x-0 bg-white dark:bg-[#a1a1aa] group-hover:w-[18px] group-hover:h-[18px] group-hover:m-[-1px] group-active:w-[14px] group-active:h-[14px] group-active:m-[1px]'
              }`} />
            </button>
          </div>
        </div>
      </section>

      <section className="universal-card" aria-labelledby="project-layouts-heading">
        <h2 id="project-layouts-heading" className="text-xl font-bold text-white mb-1">Отображение списков проектов</h2>
        <p className="text-gray-400 mb-6 text-xs md:text-sm">Выберите предпочтительный вид отображения списков проектов для каждой страницы на этом устройстве.</p>
        
        <div className="project-lists">
          {LAYOUT_CATEGORIES.map((cat) => {
            const currentMode = layouts[cat.id] || 'rows'
            return (
              <div key={cat.id} className="flex flex-col gap-2">
                <div className="text-sm font-semibold text-white">{cat.name}</div>
                <div className="project-list-layouts">
                  <button
                    onClick={() => handleLayoutChange(cat.id, 'rows')}
                    className={`preview-radio ${currentMode === 'rows' ? 'selected' : ''}`}
                    aria-label={`Вид списка для ${cat.name}`}
                  >
                    <div className="preview">
                      <div className="layout-list-mode">
                        <div className="example-card" />
                        <div className="example-card" />
                        <div className="example-card" />
                        <div className="example-card" />
                      </div>
                    </div>
                    <div className="label">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="radio shrink-0">
                        {currentMode === 'rows' ? (
                          <>
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="5" fill="currentColor" />
                          </>
                        ) : (
                          <circle cx="12" cy="12" r="10" />
                        )}
                      </svg>
                      Список
                    </div>
                  </button>

                  <button
                    onClick={() => handleLayoutChange(cat.id, 'grid')}
                    className={`preview-radio ${currentMode === 'grid' ? 'selected' : ''}`}
                    aria-label={`Вид сетки для ${cat.name}`}
                  >
                    <div className="preview">
                      <div className="layout-gallery-mode">
                        <div className="example-card" />
                        <div className="example-card" />
                        <div className="example-card" />
                        <div className="example-card" />
                      </div>
                    </div>
                    <div className="label">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="radio shrink-0">
                        {currentMode === 'grid' ? (
                          <>
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="5" fill="currentColor" />
                          </>
                        ) : (
                          <circle cx="12" cy="12" r="10" />
                        )}
                      </svg>
                      Сетка
                    </div>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="universal-card text-center flex flex-col items-center justify-center p-6 gap-3" aria-labelledby="reset-heading">
        <h2 id="reset-heading" className="text-lg font-bold text-white mb-0">Что-то пошло не так?</h2>
        <p className="text-gray-400 text-xs md:text-sm max-w-md m-0">Если интерфейс отображается некорректно или вы просто хотите вернуть настройки по умолчанию.</p>
        
        <button
          onClick={handleResetAll}
          disabled={isResetting}
          className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 border border-gray-300 dark:border-gray-700 cursor-pointer disabled:opacity-50"
        >
          {isResetting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Чиним всё...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Я всё сломал</span>
            </>
          )}
        </button>
      </section>
    </div>
  )
}
