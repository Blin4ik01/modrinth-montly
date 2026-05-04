import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getModVersions, getTeamMembers, formatDate } from '@/lib/modrinth'
import { filterModContent, filterTeamMembers, isProjectBlocked, isOrganizationBlocked, filterVersionChangelog } from '@/lib/contentFilter'
import ResourceSidebar from '@/app/components/ResourceSidebar'
import ContentNavigation from '@/app/components/ContentNavigation'
import ResourceHeader from '@/app/components/ResourceHeader'
import IconPreload from '@/app/components/IconPreload'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export async function generateMetadata({ params }) {
  try {
    const modpack = await getMod(params.slug)
    const url = `https://modrinth.black/modpack/${params.slug}/changelog`
    return {
      title: `${modpack.title} - Изменения | ModrinthProxy`,
      description: `История изменений модпака ${modpack.title}`,
      openGraph: {
        siteName: 'modrinth.black',
        type: 'website',
        url: url,
        title: `${modpack.title} - Изменения | ModrinthProxy`,
        description: `История изменений модпака ${modpack.title}`,
        images: modpack.icon_url ? [{ url: modpack.icon_url }] : [],
      },
      twitter: {
        card: 'summary',
        title: `${modpack.title} - Изменения | ModrinthProxy`,
        description: `История изменений модпака ${modpack.title}`,
        images: modpack.icon_url ? [modpack.icon_url] : [],
      },
    }
  } catch {
    return { title: 'Модпак не найден | ModrinthProxy' }
  }
}

export default async function ModpackChangelogPage({ params }) {
  const { slug } = params;
  if (isProjectBlocked(slug)) {
    return <div className="text-center py-16"><Link href="/modpacks" className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold">Вернуться</Link></div>
  }

  let modpack, versions, teamMembers;
  try {
    [modpack, versions, teamMembers] = await Promise.all([getMod(slug), getModVersions(slug), getTeamMembers(slug)]);
    modpack = filterModContent(modpack);
    teamMembers = filterTeamMembers(teamMembers);
    if (isOrganizationBlocked(modpack.organization)) notFound()
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <IconPreload iconUrl={modpack.icon_url} />
      <ResourceHeader resource={modpack} contentType="modpack" versions={versions} />
      
      <ContentNavigation slug={slug} contentType="modpack" versionsCount={versions.length} galleryCount={modpack.gallery?.length || 0} projectColor={modpack.color} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-modrinth-dark border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 md:p-6">
              {versions.slice(0, 5).map((version) => (
                <div key={version.id} className="mb-6 pb-6 border-b border-gray-800 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{version.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${version.version_type === 'release' ? 'bg-green-900 text-green-300' : version.version_type === 'beta' ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'}`}>{version.version_type}</span>
                    <span className="text-sm text-gray-500">{formatDate(version.date_published)}</span>
                  </div>
                  <div className="text-gray-300 text-sm prose prose-invert prose-sm max-w-none">
                    {version.changelog ? (<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{filterVersionChangelog(version.changelog)}</ReactMarkdown>) : (<p className="text-gray-500 italic">Нет описания изменений</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <ResourceSidebar resource={modpack} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

