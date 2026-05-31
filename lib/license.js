/** @typedef {{ id?: string, name?: string, url?: string | null }} License */

export function formatLicenseShortLabel(license) {
  if (!license) return null

  const id = license.id
  if (id?.startsWith('LicenseRef-')) {
    const name = typeof license.name === 'string' ? license.name.trim() : ''
    if (name) return name
    return id.slice('LicenseRef-'.length).replace(/-/g, ' ')
  }

  if (id) return id

  const name = typeof license.name === 'string' ? license.name.trim() : ''
  return name || null
}

export function formatLicenseFullName(license) {
  if (!license) return null

  const name = typeof license.name === 'string' ? license.name.trim() : ''
  if (name) return name

  return formatLicenseShortLabel(license)
}

export function isSpdxListedLicenseId(id) {
  if (!id || typeof id !== 'string') return false
  if (id.startsWith('LicenseRef-') || id.startsWith('Custom')) return false
  return /^[A-Za-z0-9.+()-]+$/.test(id)
}

export function getSpdxLicenseUrl(id) {
  if (!isSpdxListedLicenseId(id)) return null
  return `https://spdx.org/licenses/${encodeURIComponent(id)}.html`
}

export function resolveLicenseHref(license) {
  if (!license) return null

  const url = license.url
  if (typeof url === 'string' && /^https?:\/\//i.test(url.trim())) {
    return url.trim()
  }

  return getSpdxLicenseUrl(license.id)
}
