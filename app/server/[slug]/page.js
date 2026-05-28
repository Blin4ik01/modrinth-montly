import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getTeamMembers, getVersion, formatDate } from '@/lib/modrinth'
import { filterModContent, filterTeamMembers, isProjectBlocked, isOrganizationBlocked } from '@/lib/contentFilter'
import { getFilterConfig, getCategoryName } from '@/lib/filterConfig'
import ResourceHeader from '@/app/components/ResourceHeader'
import ServerSidebarDetails from '@/app/components/ServerSidebarDetails'
import ServerGallery from '@/app/components/ServerGallery'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export async function generateMetadata({ params }) {
  try {
    const server = await getMod(params.slug)
    const url = `https://modrinth.black/server/${params.slug}`
    const fullDescription = server.description || `Minecraft сервер ${server.title}. Поддержка версий: ${server.minecraft_java_server?.content?.supported_game_versions?.join(', ') || 'все версии'}.`
    
    return {
      title: `${server.title} - Minecraft сервер`,
      description: fullDescription,
      robots: 'all',
      openGraph: {
        siteName: 'modrinth.black',
        type: 'website',
        url: url,
        title: `${server.title} - Minecraft сервер`,
        description: server.description,
        images: server.icon_url ? [{ url: server.icon_url }] : [],
      },
      twitter: {
        card: 'summary',
        title: `${server.title} - Minecraft сервер`,
        description: server.description,
        images: server.icon_url ? [server.icon_url] : [],
      },
      other: {
        'theme-color': '#1bd96a',
      },
    }
  } catch {
    return {
      title: 'Сервер не найден | ModrinthProxy',
      description: 'Запрашиваемый сервер не найден',
    }
  }
}

export default async function ServerPage({ params }) {
  const { slug } = params;
  
  if (isProjectBlocked(slug)) {
    return (
      <div className="text-center py-16 max-w-2xl mx-auto">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-3xl font-bold text-red-500 mb-4">Доступ ограничен</h1>
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-6 mb-6 text-left">
            <p className="text-gray-300 mb-3">
              Данный проект недоступен в соответствии с региональными ограничениями и требованиями Роскомнадзора.
            </p>
            <p className="text-gray-400 text-sm">
              К сожалению, некоторые проекты были заблокированы на территории Российской Федерации по решению регулирующих органов. Мы вынуждены ограничить доступ к этому контенту для соблюдения действующего законодательства.
            </p>
          </div>
        </div>
        <Link 
          href="/servers"
          className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-modrinth-green-light transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Вернуться к серверам</span>
        </Link>
      </div>
    )
  }

  let server, teamMembers, requiredContentVersion = null;
  try {
    [server, teamMembers] = await Promise.all([
      getMod(slug),
      getTeamMembers(slug),
    ]);
    
    server = filterModContent(server);
    teamMembers = filterTeamMembers(teamMembers);
    
    if (server.minecraft_java_server?.content?.version_id) {
      try {
        requiredContentVersion = await getVersion(server.minecraft_java_server.content.version_id)
      } catch (e) {
        console.error('Failed to load required content version:', e)
      }
    }

    if (isOrganizationBlocked(server.organization)) {
      return (
        <div className="text-center py-16 max-w-2xl mx-auto">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-3xl font-bold text-red-500 mb-4">Доступ ограничен</h1>
            <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-6 mb-6 text-left">
              <p className="text-gray-300 mb-3">
                Данный проект недоступен в соответствии с региональными ограничениями и требованиями Роскомнадзора.
              </p>
              <p className="text-gray-400 text-sm">
                К сожалению, некоторые проекты были заблокированы на территории Российской Федерации по решению регулирующих органов. Мы вынуждены ограничить доступ к этому контенту для соблюдения действующего законодательства.
              </p>
            </div>
          </div>
          <Link 
            href="/servers"
            className="inline-flex items-center gap-2 bg-modrinth-green hover:bg-modrinth-green-light text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Вернуться к серверам</span>
          </Link>
        </div>
      )
    }
  } catch (error) {
    notFound()
  }

  const getLinks = (srv) => {
    const list = []
    if (srv.discord_url) list.push({ name: 'Вступить в Discord', url: srv.discord_url, platform: 'discord' })
    if (srv.source_url) list.push({ name: 'Source Code', url: srv.source_url, platform: 'source' })
    if (srv.wiki_url) list.push({ name: 'Wiki', url: srv.wiki_url, platform: 'wiki' })
    if (srv.issues_url) list.push({ name: 'Issues', url: srv.issues_url, platform: 'issues' })
    
    if (srv.link_urls) {
      Object.keys(srv.link_urls).forEach(key => {
        const item = srv.link_urls[key]
        if (item && item.url && !list.some(x => x.url === item.url)) {
          let name = 'Link'
          if (item.platform === 'discord') name = 'Вступить в Discord'
          else if (item.platform === 'store') name = 'Магазин'
          else if (item.platform === 'wiki') name = 'Wiki'
          else if (item.platform === 'issues') name = 'Issues'
          else if (item.platform === 'site' || item.platform === 'website') name = 'Наш сайт'
          else {
            const rawName = item.platform.charAt(0).toUpperCase() + item.platform.slice(1)
            name = rawName === 'Site' || rawName === 'Website' ? 'Наш сайт' : rawName
          }
          list.push({ name, url: item.url, platform: item.platform })
        }
      })
    }
    return list
  }

  const getLinkIcon = (platform) => {
    if (platform === 'discord') {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0 13 13 0 0 0-.617-1.25.08.08 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.1.1 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10 10 0 0 0 .372-.292.07.07 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03M8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418" />
        </svg>
      )
    }
    return (
      <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  }

  const links = getLinks(server)
  const allTags = [...new Set([...(server.categories || []), ...(server.additional_categories || [])])]
  const filterConfig = getFilterConfig('servers')

  return (
    <div className="max-w-7xl mx-auto">
      <ResourceHeader resource={server} contentType="server" versions={[]} />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-4">
        <div className="min-w-0">
          <ServerGallery gallery={server.gallery} />
          <div className="bg-modrinth-dark border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {server.body}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:sticky lg:top-4 lg:self-start flex flex-col gap-4">
          <ServerSidebarDetails server={server} requiredContentVersion={requiredContentVersion} />

          {links.length > 0 && (
            <div className="bg-modrinth-dark border border-gray-800 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
              <h2 className="text-lg font-bold text-white m-0">Ссылки</h2>
              <div className="flex flex-col gap-3 font-semibold">
                {links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center w-fit text-modrinth-green hover:brightness-125 transition-all text-sm leading-tight hover:underline"
                  >
                    {getLinkIcon(link.platform)}
                    <span>{link.name}</span>
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {allTags.length > 0 && (
            <div className="bg-modrinth-dark border border-gray-800 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
              <h2 className="text-lg font-bold text-white m-0">Теги</h2>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map(tag => (
                  <Link
                    key={tag}
                    href={`/discover/servers?sc=${tag}`}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700/40 text-gray-300 px-2.5 py-1.5 leading-none rounded-full text-xs font-semibold hover:text-white transition-all active:scale-95"
                  >
                    {getCategoryName(tag, filterConfig)}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {teamMembers && teamMembers.length > 0 && (
            <div className="bg-modrinth-dark border border-gray-800 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
              <h2 className="text-lg font-bold text-white m-0">Авторы</h2>
              <div className="flex flex-col gap-3 font-semibold">
                {teamMembers.map((member, idx) => (
                  <a 
                    key={idx}
                    href={`/user/${member.user.username}`}
                    className="flex gap-2.5 items-center w-fit text-gray-300 hover:text-white leading-tight group"
                  >
                    {member.user.avatar_url && (
                      <img 
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0" 
                        src={member.user.avatar_url} 
                        alt="" 
                      />
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="flex items-center gap-1 group-hover:underline text-sm font-semibold text-white">
                        {member.user.username}
                        {member.role === 'Owner' && (
                          <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        )}
                      </span>
                      <span className="text-xs text-gray-500 font-medium capitalize">{member.role}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="bg-modrinth-dark border border-gray-800 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
            <h2 className="text-lg font-bold text-white m-0">Сведения</h2>
            <div className="space-y-3 text-xs md:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0" />
                </svg>
                <span>{(() => {
                  const count = server.followers || 0
                  const mod10 = count % 10
                  const mod100 = count % 100
                  let word = 'подписчиков'
                  if (!(mod100 >= 11 && mod100 <= 19)) {
                    if (mod10 === 1) word = 'подписчик'
                    else if (mod10 >= 2 && mod10 <= 4) word = 'подписчика'
                  }
                  return `${count} ${word}`
                })()}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Размещён {formatTimeAgo(server.published || server.created)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTimeAgo(dateString) {
  if (!dateString) return '—'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '—'
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  const intervals = [
    { seconds: 31536000, one: 'год', two: 'года', many: 'лет' },
    { seconds: 2592000, one: 'месяц', two: 'месяца', many: 'месяцев' },
    { seconds: 604800, one: 'неделю', two: 'недели', many: 'недель' },
    { seconds: 86400, one: 'день', two: 'дня', many: 'дней' },
    { seconds: 3600, one: 'час', two: 'часа', many: 'часов' },
    { seconds: 60, one: 'минуту', two: 'минуты', many: 'минут' },
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      const mod10 = count % 10
      const mod100 = count % 100
      let word = interval.many
      if (!(mod100 >= 11 && mod100 <= 19)) {
        if (mod10 === 1) word = interval.one
        else if (mod10 >= 2 && mod10 <= 4) word = interval.two
      }
      return `${count} ${word} назад`
    }
  }
  
  return 'только что'
}
