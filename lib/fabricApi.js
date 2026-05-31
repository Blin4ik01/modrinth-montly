/** Modrinth project id for Fabric API (slug: fabric-api) */
export const FABRIC_API_PROJECT_ID = 'P7dR8mSH'

export function isFabricApiProject(mod) {
  if (!mod) return false
  return mod.id === FABRIC_API_PROJECT_ID || mod.slug === 'fabric-api'
}
