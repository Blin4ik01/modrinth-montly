const UTM_SOURCE = 'modrinth.black'
const UTM_MEDIUM = 'referral'

export function withReferralUtm(url) {
  const raw = url?.trim()
  if (!raw) return url

  try {
    const parsed = new URL(raw.includes('://') ? raw : `https://${raw}`)
    parsed.searchParams.set('utm_source', UTM_SOURCE)
    parsed.searchParams.set('utm_medium', UTM_MEDIUM)
    return parsed.toString()
  } catch {
    return url
  }
}
