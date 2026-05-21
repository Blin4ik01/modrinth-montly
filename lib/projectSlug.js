export function normalizeProjectSlug(slug) {
  if (slug == null || typeof slug !== 'string') return slug
  let s = slug.trim()
  try {
    s = decodeURIComponent(s.replace(/\+/g, '%2B'))
  } catch {
    s = slug.trim()
  }
  if (s.includes(' ')) {
    s = s.replace(/ /g, '+')
  }
  return s
}
