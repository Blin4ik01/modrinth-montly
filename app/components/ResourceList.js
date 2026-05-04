'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import ResourceCard from './ResourceCard'
import ResourceCardSkeleton from './ResourceCardSkeleton'

export default function ResourceList({ resources, type = 'mod' }) {
  const searchParams = useSearchParams()
  const [showSkeleton, setShowSkeleton] = useState(false)
  const prevParamsRef = useRef(searchParams.toString())

  useEffect(() => {
    const currentParams = searchParams.toString()
    if (prevParamsRef.current !== currentParams) {
      setShowSkeleton(true)
      prevParamsRef.current = currentParams
      
      const timer = setTimeout(() => {
        setShowSkeleton(false)
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const packGrid = type === 'resourcepack' || type === 'shader'
  const listClass = packGrid ? 'grid grid-cols-1 gap-4 sm:grid-cols-2' : 'space-y-3'
  const skeletonCount = packGrid ? 6 : 10

  if (showSkeleton) {
    return (
      <div className={listClass}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ResourceCardSkeleton key={index} variant={packGrid ? 'resourcepack' : 'default'} />
        ))}
      </div>
    )
  }

  return (
    <div className={listClass}>
      {resources.map((resource) => (
        <ResourceCard key={resource.project_id} resource={resource} type={type} />
      ))}
    </div>
  )
}

