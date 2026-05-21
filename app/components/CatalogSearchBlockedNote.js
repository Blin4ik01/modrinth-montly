import { catalogBlockedRemovedPhrase } from '@/lib/catalogBlockedNote'

export default function CatalogSearchBlockedNote({ count }) {
  if (!(count > 0)) return null
  return (
    <span className="catalog-search-blocked-note">
      {' (из поисковой выдачи '}
      {catalogBlockedRemovedPhrase(count)}
      {')'}
    </span>
  )
}
