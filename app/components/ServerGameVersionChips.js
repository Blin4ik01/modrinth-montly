'use client'

import Link from 'next/link'
import StyledTooltip from './StyledTooltip'
import {
  facetMcVersionQuery,
  formatServerSidebarVersions,
  versionsForCompressedRange,
} from '@/lib/minecraftVersionSort'

const chipCls =
  'bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700/40 hover:border-modrinth-green/30 px-2.5 py-1.5 leading-none rounded-full text-xs font-semibold text-gray-300 hover:text-white transition-all active:scale-95'

function RangeChip({ range, rawVersions }) {
  const expanded = versionsForCompressedRange(range, rawVersions)
  const v = facetMcVersionQuery(range, rawVersions)

  const tooltipBody =
    expanded.length > 1 ? (
      <span className="block text-left">
        <span className="block text-[11px] font-semibold">{range}</span>
        <span className="mt-1 block max-h-[min(220px,40vh)] overflow-y-auto overscroll-contain leading-snug">
          {expanded.join(', ')}
        </span>
      </span>
    ) : expanded.length === 1 ? (
      <>Поддерживает {expanded[0]}</>
    ) : (
      <>Поддерживает {range}</>
    )

  const inner = <span>{range}</span>

  if (v) {
    return (
      <StyledTooltip
        label={tooltipBody}
        contentClassName={expanded.length > 1 ? '!max-w-[min(380px,calc(100vw-24px))]' : ''}
      >
        <Link href={`/discover/servers?sgv=${encodeURIComponent(v)}`} className={chipCls}>
          {inner}
        </Link>
      </StyledTooltip>
    )
  }

  return (
    <StyledTooltip
      label={tooltipBody}
      contentClassName={expanded.length > 1 ? '!max-w-[min(380px,calc(100vw-24px))]' : ''}
    >
      <span className={`${chipCls} cursor-default hover:text-gray-300 hover:bg-gray-800/60 hover:border-gray-700/40`}>
        {inner}
      </span>
    </StyledTooltip>
  )
}

export default function ServerGameVersionChips({ rawVersions, recommendedVersion }) {
  const items = formatServerSidebarVersions(rawVersions, recommendedVersion)
  if (!items.length) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) =>
        item.kind === 'recommended' ? (
          <Link
            key={`rec-${item.version}`}
            href={`/discover/servers?sgv=${encodeURIComponent(item.version)}`}
            className={chipCls}
          >
            {item.version}
            <span className="font-normal text-gray-500"> (рекомендуется)</span>
          </Link>
        ) : (
          <RangeChip key={`range-${item.range}`} range={item.range} rawVersions={rawVersions} />
        ),
      )}
    </div>
  )
}
