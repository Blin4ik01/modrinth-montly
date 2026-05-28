'use client'

import { useState } from 'react'
import Link from 'next/link'
import StyledTooltip from './StyledTooltip'

import { SERVER_REGIONS, SERVER_LANGUAGES } from '@/lib/serverCategories'
import ServerGameVersionChips from './ServerGameVersionChips'

const mapLanguage = (code) => {
  const lang = SERVER_LANGUAGES.find(l => l.id.toLowerCase() === code.toLowerCase())
  return lang ? lang.name : code.toUpperCase()
}

const mapRegion = (region) => {
  const reg = SERVER_REGIONS.find(r => r.id.toLowerCase() === region.toLowerCase())
  if (reg) return reg.name
  
  const fallbackMapping = {
    'us_west': 'Западное побережье США',
    'us_east': 'Восточное побережье США',
    'eu': 'Европа',
    'ru': 'Россия'
  }
  return fallbackMapping[region.toLowerCase()] || region.toUpperCase()
}

function ServerAddressCopy({ address, tooltip }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <StyledTooltip label={copied ? 'Скопировано!' : tooltip}>
      <button
        onClick={handleCopy}
        className="w-full bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 hover:border-modrinth-green/30 flex gap-2 justify-between rounded-xl items-center px-3 pr-1.5 h-12 cursor-pointer transition-all duration-300 active:scale-95 text-left group"
      >
        <span className="font-semibold text-white truncate text-sm">{address}</span>
        <div className="w-8 h-8 rounded-lg bg-gray-900/40 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
          {copied ? (
            <svg className="w-4 h-4 text-modrinth-green" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </div>
      </button>
    </StyledTooltip>
  )
}

export default function ServerSidebarDetails({ server, requiredContentVersion = null }) {
  const javaAddress = server.minecraft_java_server?.address?.trim() || ''
  const bedrockAddress = server.minecraft_bedrock_server?.address?.trim() || ''

  const primaryFile = requiredContentVersion?.files?.find(f => f.primary) || requiredContentVersion?.files?.[0]
  const downloadUrl = primaryFile?.url

  const javaContent = server.minecraft_java_server?.content
  const gameVersions = javaContent?.supported_game_versions || server.game_versions || []
  const recommendedVersion = javaContent?.recommended_game_version || null
  const loaders = server.loaders || server.mrpack_loaders || []

  return (
    <div className="bg-modrinth-dark border border-gray-800 rounded-2xl p-4 flex flex-col gap-4 shadow-lg">
      <h2 className="text-lg font-bold text-white m-0">О сервере</h2>
      
      {server.minecraft_java_server?.content && server.minecraft_java_server.content.kind !== 'vanilla' && (server.minecraft_java_server.content.project_name || server.minecraft_java_server.content.version_id) && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider m-0">Необходимая сборка</h3>
          <div className="flex gap-1.5 items-center justify-between px-3 pr-1.5 py-1.5 rounded-xl bg-gray-900/50 border border-gray-800/40">
            <div className="flex gap-2 items-center min-w-0">
              {server.minecraft_java_server.content.project_icon && (
                <img 
                  className="w-9 h-9 rounded-lg object-cover flex-shrink-0" 
                  src={server.minecraft_java_server.content.project_icon} 
                  alt="" 
                />
              )}
              <div className="flex flex-col min-w-0">
                <span className="truncate font-semibold text-sm text-white leading-tight">
                  {server.minecraft_java_server.content.project_name}
                </span>
                {(requiredContentVersion?.version_number || server.minecraft_java_server.content.version_id) && (
                  <span className="truncate text-xs text-gray-400 font-medium">
                    {requiredContentVersion?.version_number || 'Версия ' + server.minecraft_java_server.content.version_id}
                  </span>
                )}
              </div>
            </div>
            {downloadUrl && (
              <StyledTooltip label="Скачать сборку сервера">
                <a 
                  href={downloadUrl}
                  className="w-8 h-8 rounded-full bg-modrinth-green/10 hover:bg-modrinth-green/20 text-modrinth-green flex items-center justify-center transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4-4 4m0 0-4-4m4 4V4" />
                  </svg>
                </a>
              </StyledTooltip>
            )}
          </div>
        </div>
      )}

      {(javaAddress || gameVersions.length > 0 || loaders.length > 0) && (
        <div className="flex flex-col gap-2">
          <Link href="/discover/servers" className="text-xs text-gray-500 hover:text-modrinth-green font-semibold uppercase tracking-wider m-0 w-fit transition-colors">
            Minecraft: Java Edition
          </Link>
          {javaAddress && (
            <ServerAddressCopy address={javaAddress} tooltip="Скопировать IP Java-сервера" />
          )}
          <ServerGameVersionChips rawVersions={gameVersions} recommendedVersion={recommendedVersion} />
          {loaders.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {loaders.map(loader => (
              <Link
                key={String(loader)}
                href={`/discover/servers?sc=${encodeURIComponent(String(loader).toLowerCase())}`}
                className="bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700/40 hover:border-modrinth-green/30 px-2.5 py-1.5 leading-none rounded-full text-xs font-semibold text-gray-300 hover:text-white capitalize transition-all active:scale-95"
              >
                {loader}
              </Link>
            ))}
          </div>
          )}
        </div>
      )}

      {bedrockAddress && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider m-0">
            Minecraft: Bedrock Edition
          </h3>
          <ServerAddressCopy address={bedrockAddress} tooltip="Скопировать IP Bedrock-сервера" />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider m-0">Регион</h3>
        <div className="flex flex-wrap gap-1.5 items-center">
          {server.minecraft_java_server?.ping ? (
            <span className="bg-green-500/10 border border-green-500/30 px-2.5 py-1.5 leading-none rounded-full text-xs font-bold text-green-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />
              </svg>
              В сети
            </span>
          ) : (
            <span className="bg-gray-800/60 border border-gray-700/40 px-2.5 py-1.5 leading-none rounded-full text-xs font-semibold text-gray-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.5M5 12.5a10.94 10.94 0 0 1 5.83-2.84" />
                <path d="M8.9 5.1a16.84 16.84 0 0 1 12.2 4.4M2.9 8.9a16.85 16.85 0 0 1 2.2-1.3" />
              </svg>
              Вне сети
            </span>
          )}
          {server.minecraft_server?.region && (
            <span className="bg-gray-800/60 border border-gray-700/40 px-2.5 py-1.5 leading-none rounded-full text-xs font-semibold text-gray-300">
              {mapRegion(server.minecraft_server.region)}
            </span>
          )}
        </div>
      </div>

      {server.minecraft_server?.languages && server.minecraft_server.languages.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider m-0">Языки</h3>
          <div className="flex flex-wrap gap-1.5">
            {server.minecraft_server.languages.map(lang => (
              <span key={lang} className="bg-gray-800/60 border border-gray-700/40 px-2.5 py-1.5 leading-none rounded-full text-xs font-semibold text-gray-300">
                {mapLanguage(lang)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
