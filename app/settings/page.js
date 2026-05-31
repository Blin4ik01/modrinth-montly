import SettingsClient from './SettingsClient'

export const metadata = {
  title: 'Настройки сайта | ModrinthProxy',
  description: 'Настройте поведение и внешний вид сайта ModrinthProxy под ваши предпочтения на этом устройстве.',
  robots: 'noindex, nofollow'
}

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold text-white mb-2" id="settings-title">Настройки</h1>
      <p className="text-gray-400 mb-8 text-sm md:text-base">Персонализируйте отображение каталогов и функции на этом устройстве.</p>
      <SettingsClient />
    </div>
  )
}
