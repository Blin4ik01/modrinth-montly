'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { resolveProjectHref, dependencyTypeClass, dependencyTypeLabel, filterNestedDependencies } from '@/lib/dependencies'

function ModIcon({ project }) {
  if (project?.icon_url) {
    return (
      <img
        src={project.icon_url}
        alt=""
        className="size-[1em] shrink-0 rounded-[2px] object-cover"
      />
    )
  }
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 16V8a2 2 0 00-5.656 0l-4 4a4 4 0 105.656 0l4-4a4 4 0 00-5.656-5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l1.102-1.101m-.758-4.899a4 4 0 00-5.656-5.656l-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00-.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
    </svg>
  )
}

function GraphIconButton({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors"
      title="Граф зависимостей"
      aria-label="Граф зависимостей"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path strokeLinecap="round" d="M8 6h8M7 8l3 8M17 8l-3 8" />
      </svg>
    </button>
  )
}

function DepRow({ dep, depth, ancestorIds, rootProjectIds, expanded, loadingChildren, children, expandable, onToggle }) {
  const project = dep.project
  const href = project ? resolveProjectHref(project) : null
  const title = dep.label || project?.title || dep.file_name || 'Зависимость'
  const key = dep.dedupeKey
  const nested = children[key]
  const isEmpty =
    expandable[key] === false &&
    Object.prototype.hasOwnProperty.call(children, key) &&
    !nested?.length
  const canExpand = Boolean(project?.slug) && expandable[key] !== false
  const isOpen = Boolean(expanded[key])
  const showNested = isOpen && (loadingChildren[key] || nested?.length > 0 || isEmpty)
  const nextAncestorIds = [...ancestorIds, dep.project?.id].filter(Boolean)

  return (
    <li className="list-none">
      <div className="flex items-center gap-2 min-w-0" style={{ paddingLeft: depth > 0 ? `${depth * 12}px` : 0 }}>
        {canExpand ? (
          <button
            type="button"
            onClick={() => onToggle(dep, nextAncestorIds)}
            className="flex size-[1em] shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-secondary hover:text-primary"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Свернуть' : 'Развернуть зависимости'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        ) : (
          <span className="w-4 shrink-0" aria-hidden />
        )}
        {href ? (
          <Link href={href} target="_blank" rel="noopener noreferrer" className="flex min-w-0 flex-1 items-center gap-2 no-underline hover:underline truncate">
            <ModIcon project={project} />
            <span className="truncate text-[var(--text-primary)]">{title}</span>
          </Link>
        ) : (
          <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-[var(--text-primary)]">
            <ModIcon project={project} />
            <span className="truncate">{title}</span>
          </span>
        )}
        <span className={`shrink-0 rounded-full border border-solid px-2 py-1 text-xs font-medium leading-none ${dependencyTypeClass(dep.dependency_type)}`}>
          {dependencyTypeLabel(dep.dependency_type)}
        </span>
      </div>
      {showNested && (
        <div className="ml-6 mt-1 border-l border-gray-800 pl-3">
          {loadingChildren[key] ? (
            <p className="text-xs text-gray-500 m-0 py-0.5">Загрузка…</p>
          ) : isEmpty ? (
            <p className="text-xs text-gray-500 m-0 py-0.5">Нет зависимостей в последней версии</p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {nested.map((child) => (
                <DepRow
                  key={child.dedupeKey}
                  dep={child}
                  depth={depth + 1}
                  ancestorIds={nextAncestorIds}
                  rootProjectIds={rootProjectIds}
                  expanded={expanded}
                  loadingChildren={loadingChildren}
                  children={children}
                  expandable={expandable}
                  onToggle={onToggle}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  )
}

const DependencyExplorerModal = dynamic(
  () => import('./DependencyExplorer'),
  { ssr: false, loading: () => null },
)

export default function ResourceDependenciesSection({ projectSlug, projectTitle, projectId }) {
  const [deps, setDeps] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState({})
  const [children, setChildren] = useState({})
  const [expandable, setExpandable] = useState({})
  const [loadingChildren, setLoadingChildren] = useState({})
  const [graphOpen, setGraphOpen] = useState(false)

  const rootProjectIds = useMemo(() => {
    const ids = deps.map((d) => d.project_id).filter(Boolean)
    if (projectId) ids.push(projectId)
    return [...new Set(ids)]
  }, [deps, projectId])

  const rootAncestorIds = useMemo(
    () => (projectId ? [projectId] : []),
    [projectId],
  )

  const fetchNested = useCallback(async (slug) => {
    const res = await fetch(`/api/dependencies?slug=${encodeURIComponent(slug)}`)
    return res.ok ? await res.json() : []
  }, [])

  const loadRoot = useCallback(async () => {
    if (!projectSlug) {
      setDeps([])
      setLoading(false)
      return
    }
    setLoading(true)
    setExpanded({})
    setChildren({})
    setExpandable({})
    try {
      const res = await fetch(`/api/dependencies?slug=${encodeURIComponent(projectSlug)}`)
      setDeps(res.ok ? await res.json() : [])
    } catch {
      setDeps([])
    } finally {
      setLoading(false)
    }
  }, [projectSlug])

  useEffect(() => {
    loadRoot()
  }, [loadRoot])

  const toggleExpand = useCallback(async (dep, ancestorIds) => {
    const key = dep.dedupeKey
    const slug = dep.project?.slug
    if (!slug) return

    if (expanded[key]) {
      setExpanded((prev) => ({ ...prev, [key]: false }))
      return
    }

    if (children[key]?.length > 0) {
      setExpanded((prev) => ({ ...prev, [key]: true }))
      return
    }

    setExpanded((prev) => ({ ...prev, [key]: true }))
    setLoadingChildren((prev) => ({ ...prev, [key]: true }))
    try {
      const nested = filterNestedDependencies(await fetchNested(slug), {
        ancestorIds,
        rootProjectIds,
        selfProjectId: dep.project?.id,
      })
      if (nested.length === 0) {
        setExpandable((prev) => ({ ...prev, [key]: false }))
        setExpanded((prev) => ({ ...prev, [key]: true }))
        setChildren((prev) => ({ ...prev, [key]: [] }))
        return
      }
      setExpandable((prev) => ({ ...prev, [key]: true }))
      setChildren((prev) => ({ ...prev, [key]: nested }))
    } catch {
      setExpandable((prev) => ({ ...prev, [key]: false }))
      setExpanded((prev) => ({ ...prev, [key]: true }))
      setChildren((prev) => ({ ...prev, [key]: [] }))
    } finally {
      setLoadingChildren((prev) => ({ ...prev, [key]: false }))
    }
  }, [expanded, children, fetchNested, rootProjectIds])

  if (!projectSlug) return null

  return (
    <div className="bg-modrinth-dark border border-gray-300 dark:border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-base font-bold m-0 text-[var(--text-primary)]">
          Зависимости
          {!loading && deps.length > 0 ? (
            <span className="ml-1.5 text-sm font-normal text-gray-500">({deps.length})</span>
          ) : null}
        </h3>
        <GraphIconButton onOpen={() => setGraphOpen(true)} />
      </div>
      {loading ? (
        <p className="text-sm text-gray-500 py-2">Загрузка…</p>
      ) : deps.length === 0 ? (
        <p className="text-sm text-gray-500 py-2">Нет зависимостей в последней версии</p>
      ) : (
        <div className="max-h-[min(28rem,70vh)] overflow-y-auto custom-scrollbar pr-1">
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {deps.map((dep) => (
              <DepRow
                key={dep.dedupeKey}
                dep={dep}
                depth={0}
                ancestorIds={rootAncestorIds}
                rootProjectIds={rootProjectIds}
                expanded={expanded}
                loadingChildren={loadingChildren}
                children={children}
                expandable={expandable}
                onToggle={toggleExpand}
              />
            ))}
          </ul>
        </div>
      )}
      {graphOpen && (
        <DependencyExplorerModal
          projectSlug={projectSlug}
          projectTitle={projectTitle}
          defaultOpen
          hideTrigger
          onClose={() => setGraphOpen(false)}
        />
      )}
    </div>
  )
}
