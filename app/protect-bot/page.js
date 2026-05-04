import Image from 'next/image'
import { MINEPLUGINCHECK_BOT_URL } from '@/lib/minePluginCheckBotUrl'

export const metadata = {
  title: 'Проверка модов и плагинов на хаки и бекдоры — анализ JAR онлайн | ModrinthProxy',
  description:
    'Бесплатная проверка модов и плагинов на хаки до установки: более 150 статических правил по байткоду Java, отчёт по практически полному спектру действий файла. Содержимое .jar не хранится — только хеш для повтора. Опционально глубокий анализ с ИИ. Telegram. Отдельная утилита перепака ресурспаков для разработчиков.',
  openGraph: {
    title: 'Проверка модов и плагинов на хаки и бекдоры — анализ JAR онлайн',
    description:
      'Бесплатно. Более 150 Java‑проверок, отчёт до установки. Файлы после проверки не хранятся. Telegram.',
  },
}

export default function ProtectBotLandingPage() {
  return (
    <div className="min-h-screen pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 animate-fade-in pt-4 text-center">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
            Проверка модов и плагинов на хаки
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400 md:text-lg leading-relaxed">
            Перед установкой плагина на сервер или мода на свой компьютер, лучше всего проверить файл на вредоносный код, шпионские действия, скрытые
            сетевые обращения и лишние команды. В конвейере — <strong className="text-white">более 150 проверок байткода Java</strong>: бот отдаёт{' '}
            <strong className="text-white">практически полный спектр</strong> того, что этот мод или плагин способен сделать на твоём ПК или сервере — до
            того, как ты его поставишь.
          </p>
        </div>

        <div className="animate-fade-in-up space-y-8">
          <section className="rounded-2xl border border-modrinth-green/35 bg-gradient-to-br from-modrinth-green/[0.12] via-gray-900/90 to-transparent p-8 shadow-xl md:p-10">
            <h2 className="mb-6 text-xl font-bold text-white md:text-2xl">Сервис для проверки — бесплатно и с упором на безопасность твоего файла</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-modrinth-green/25 bg-black/25 p-5">
                <h3 className="mb-2 font-semibold text-modrinth-green-light">Бесплатно</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  Пользоваться проверкой модов и плагинов можно без оплаты и без платной подписки «за доступ»: функциональность доступна каждому, кто зашёл
                  в бота.
                </p>
              </div>
              <div className="rounded-xl border border-modrinth-green/25 bg-black/25 p-5">
                <h3 className="mb-2 font-semibold text-modrinth-green-light">Файлы не копятся</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  После анализа исходник не висит у нас складом для кого‑то постороннего. Для повтора той же самой сборки хранится только хеш —
                  восстановить по нему содержимое архива нельзя.
                </p>
              </div>
              <div className="rounded-xl border border-modrinth-green/25 bg-black/25 p-5">
                <h3 className="mb-2 font-semibold text-modrinth-green-light">Понятный отчёт</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  Тебе показывают не одну строчку «чисто/грязно», а конкретные зацепки и приоритет: сеть, права, команды, классы и методы — при{' '}
                  <strong className="text-gray-300">более 150 Java‑проверках</strong> по байткоду это даёт плотную картину. Дальше можно идти в jdec или к нейросети, если нужно.
                </p>
              </div>
            </div>
            <p className="mt-6 border-t border-modrinth-green/20 pt-6 text-xs leading-relaxed text-gray-500">
              Режим «глубокого исследования» с отправкой части подозрительного кода в OpenAI ты включаешь сам — об этом ниже отдельно. Основная линия
              разбора крутится на нашей инфраструктуре.
            </p>
          </section>

          <section className="relative overflow-hidden rounded-2xl border border-sky-500/25 bg-gradient-to-br from-sky-500/15 via-gray-900/80 to-blue-950/40 p-8 shadow-2xl md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"></div>
            <div className="relative">
              <h2 className="mb-6 flex flex-wrap items-center gap-4 text-2xl font-bold text-white md:text-3xl">
                <div className="rounded-xl border border-sky-400/40 bg-sky-500/20 p-3">
                  <svg className="h-10 w-10 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                Мод или плагин (.jar)
              </h2>
              <div className="space-y-5 text-gray-200 md:text-[17px] md:leading-relaxed">
                <p>
                  Формат один и для клиента, и для сервера: внутри того же архива живёт Java‑код, который может звать интернет без твоего желания,
                  трогать привилегии игроков, таскать лишние API и классы. Бот прогоняет сборку статическим конвейером из <strong className="text-white">более 150 Java‑правил</strong>{' '}
                  и собирает отчёт так, чтобы было видно{' '}
                  <strong className="text-white">практически полный спектр того, что этот файл вообще умеет заявить о себе</strong>: куда есть зацепки на
                  вредоносное или шпионское поведение, какие есть сетевые и командные паттерны, что стоит руками перепроверить до установки. Это не
                  процентный вердикт антивируса и не суды в чате — а рабочий снимок риска до того, как ты затронешь прод или свой ПК сборкой с
                  непроверенной ссылки.
                </p>
                <p>
                  Как воспользоваться: зайди в бота по ссылке внизу страницы, пришли <strong className="text-white">исходный .jar файлом-документом</strong> (не
                  скриншотом и не пересборкой через «файлы картинкой» — именно файл). Дальше бот сам распакует нужное, прогонит правила и ответит в
                  чате структурой находок и пояснениями; если это та же сборка второй раз, ответ можно получить заметно быстрее за счёт сохранённого{' '}
                  <strong className="text-white">хеша</strong>, без складирования тела архива у нас на дисках.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-950/20 via-gray-900/85 to-transparent p-8 shadow-xl md:p-10">
            <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">Как выглядит отчёт в чате</h2>
            <p className="mb-4 text-gray-300 leading-relaxed">
              Ответ собирается в одном сообщении. Сверху — сводка по файлу: имя архива, размер, сколько классов прошло проверку, сколько всего было
              срабатываний правил и из них две шкалы — <strong className="text-white">«безопасные»</strong> и{' '}
              <strong className="text-white">«стоит проверить»</strong>: часть сообщений триггерит легитимные вещи (метрики, конфиги, загрузчик), часть действительно
              требует внимательного чтения. Ниже — <strong className="text-white">хеш файла (xxHash64)</strong>; по нему тот же файл при повторной отправке можно
              сопоставить без хранения самого содержимого у сервиса.
            </p>
            <p className="mb-4 text-gray-300 leading-relaxed">
              Каждый блок детали — текст предупреждения (например, консольные команды, выход в интернет, работа с папкой дополнений, рефлексия,
              операции с файлами, Base‑кодировки, динамическая загрузка классов, упоминание встроенной лицензии SpigotMC и др.), затем путь класса вида{' '}
              <code className="text-amber-200/90">pkg/ClassName.class</code> и методы вида{' '}
              <code className="text-amber-200/90">execute</code>, разделённые линией. Так же удобно переносить куски в jdec или в нейросеть, если нужно
              разбор политики конкретного места в коде.
            </p>
            <p className="mb-6 text-sm text-gray-500">
              В том же сообщении бот может добавить контакт поддержки для вопросов по тексту отчёта — смотри низ экрана в Telegram после полного вывода.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#0d0f14] p-4">
              <pre className="font-mono text-[10px] leading-snug text-gray-400 whitespace-pre md:text-[11px]" tabIndex={0}>
{`💾 JAR ExamplePlugin.jar
📏 Размер 115.4 KB
📋 Классов проверено: 66
⚠️ Срабатываний обнаружено: 10
   │ Безопасные: 8
   │ Стоит проверить: 2
🔐 Хеш файла (xxHash64): a9a6fb988524d0b8

⚠️ Файл может выполнять команды как консоль.
🚩 Класс: pkg/SomeFeature.class
⚙️ Метод: execute, execute
━━━━━━━━━━
⚠️ Файл подключается к сайтам.
🚩 Класс: pkg/metrics/Sender.class
⚙️ Метод: sendData
━━━━━━━━━━
💬 Есть вопросы? @…`}
              </pre>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              У живых сборок блоков может быть заметно больше: одно и то же правило может сработать в разных классах и методах — отчёт старается всё их
              перечислить, чтобы ты сам решил по контексту плагина.
            </p>
          </section>

          <section className="relative overflow-hidden rounded-2xl border border-indigo-600/35 bg-gradient-to-br from-indigo-950/50 via-gray-900/80 to-purple-950/35 p-8 shadow-2xl md:p-10">
            <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl"></div>
            <div className="relative">
              <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Глубокое исследование</h2>
              <p className="mb-6 text-gray-400">
                Дополнительный анализ .jar мода или плагина с привлечением нейросети — когда базовых проверок недостаточно.
              </p>
              <div className="space-y-5 text-gray-300">
                <div>
                  <h3 className="mb-2 font-semibold text-indigo-200">Нейросеть</h3>
                  <p>
                    Используется <strong className="text-white">GPT от OpenAI</strong> для разбора фрагментов подозрительного кода.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-indigo-200">Как это работает</h3>
                  <ul className="ml-4 list-disc space-y-2 marker:text-indigo-400">
                    <li>Часть проверок может запускать глубокое исследование.</li>
                    <li>Подозрительные фрагменты отправляются в нейросеть для более детального разбора.</li>
                    <li>Ты получаешь расширенное объяснение потенциальных рисков.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-indigo-200">Что может уходить в нейросеть</h3>
                  <ul className="ml-4 list-disc space-y-2 marker:text-indigo-400">
                    <li>подключения к сайтам;</li>
                    <li>использование команд и работа с правами в плагине или моде.</li>
                  </ul>
                </div>
                <p className="rounded-lg border border-indigo-500/25 bg-indigo-950/40 p-4 text-sm">
                  В <strong className="text-white">настройках бота</strong> можно включить или отключить глубокое исследование. Для максимальной
                  осторожности его лучше оставить включённым, если ты готов отправлять отдельные подозрительные фрагменты в OpenAI по описанному
                  сценарию.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-modrinth-green/25 bg-gradient-to-br from-modrinth-green/10 via-gray-900/90 to-gray-950/90 p-8 shadow-2xl md:p-10">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
              <svg className="h-8 w-8 text-modrinth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Политика проверки
            </h2>
            <p className="mb-6 text-lg text-gray-200">
              Можно быть спокойным: мы не копим содержимое твоих файлов после проверки и не даём никому их скачивать как «архив».
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="text-modrinth-green">•</span>
                <span>Файлы на сервере не хранятся — после проверки удаляются, доступа к содержимому извне нет.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-modrinth-green">•</span>
                <span>
                  Для повторной проверки того же файла сохраняется только <strong className="text-white">хеш</strong> (контрольная сумма), по которой нельзя
                  восстановить jar целиком.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-modrinth-green">•</span>
                <span>Отчёт строится по приоритету: самые подозрительные находки показываются первыми.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-modrinth-green">•</span>
                <span>
                  Основной анализ выполняется на нашей инфраструктуре. Отдельно: при активном режиме «глубокого исследования» выбранные фрагменты
                  подозрительного кода отправляются в OpenAI для разбора, как описано выше.
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-purple-700/35 bg-gradient-to-br from-purple-950/40 via-gray-900/75 to-blue-950/25 p-8 md:p-10">
            <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">Если не понимаешь результат</h2>
            <p className="mb-4 text-gray-300">
              Бот отмечает подозрительные классы и методы, например блоки вида «подключение к сайтам» с указанием класса и имени метода.
            </p>
            <p className="mb-4 text-gray-300">
              Открой .jar через <strong className="text-white">jdec.app</strong>, чтобы посмотреть исходник этих мест. Если с Java не дружишь —
              можно вставить фрагмент метода в любую доступную тебе нейросеть (ChatGPT, DeepSeek, Claude и т.д.) и попросить объяснить, что делает
              код.
            </p>
          </section>

          <section className="flex flex-col items-center justify-center px-4 py-10 md:py-14">
            <a
              href={MINEPLUGINCHECK_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Перейти к боту проверки JAR в Telegram"
              className="group inline-flex items-center gap-4 rounded-2xl border border-modrinth-green/45 bg-modrinth-green px-8 py-5 text-[17px] font-bold tracking-tight text-white shadow-xl shadow-black/35 transition hover:border-modrinth-green-light/80 hover:bg-modrinth-green-light hover:text-gray-950 hover:shadow-modrinth-green/20 active:scale-[0.99] md:px-12 md:py-6 md:text-lg"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-2 ring-white/35 md:h-14 md:w-14">
                <Image
                  src="/images/bot_logo.jpg"
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </span>
              Перейти к боту в Telegram
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                aria-hidden
                className="h-6 w-6 shrink-0 opacity-90 transition-opacity group-hover:opacity-100 md:h-7 md:w-7"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </section>

          <section className="rounded-2xl border border-gray-600/60 bg-gray-900/40 p-6 md:p-8">
            <h2 className="mb-3 text-lg font-bold text-gray-300 md:text-xl">Ресурспаки: утилита перепака (для разработки)</h2>
            <p className="text-[15px] leading-relaxed text-gray-500 md:text-base">
              Это не часть проверки на хаки. Отдельная функция для работы с контентом: например, взяли с сервера Minecraft ресурспак, защищённый
              софтом вроде Praxelis или IA — когда текстуры из архива нормально не выдернуть, бот может перепаковать файл. В настройках включи модуль
              «Ресурспак» и отправь пак документом.
            </p>
          </section>

          <section
            className="rounded-2xl border border-gray-700/80 bg-[var(--bg-tertiary)]/90 p-8 md:p-10"
            aria-labelledby="protect-bot-seo-heading"
          >
            <h2 id="protect-bot-seo-heading" className="mb-6 text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
              Зачем проверять моды и плагины на хаки
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 md:text-base">
              <p>
                Скачанный с каталога .jar может выглядеть безопасно, но внутри допускается всё то же, что и в любой программе на Java: скрытые запросы
                наружу, команды под видом админ-права, утечка данных с сервера или с машины игрока. Для модов Minecraft (Fabric, Forge, NeoForge,
                Quilt и др.) и для серверных плагинов (Bukkit‑совместимые ядра, гибридные решения) риск один — компрометация среды, в которую ты файл
                кладёшь.
              </p>
              <p>
                Никакой модрепозиторий не даёт полной гарантии того, что в сборке не окажется вредоносный или просто опасный по политике сервера код:
                автор меняется, сборки пересобирают, в цепочку попадают репосты. Имеет смысл{' '}
                <strong className="text-gray-900 dark:text-white">отдельно проверить jar на хаки и типичные бекдор-паттерны</strong> — так ты видишь
                сигналы (сеть, привилегии, подозрительные классы) до того, как игроки или твоя система уже пострадают.
              </p>
              <p>
                На Modrinth содержание ресурса проверяют <strong className="text-gray-900 dark:text-white">только перед первой публикацией</strong>. При обновлении
                ресурса <strong className="text-gray-900 dark:text-white">повторной такой проверки нет</strong>: новый .jar не получает тот же ручной разбор, что
                при первой публикации — остаются автоматическая проверка, жалобы и реакция модераторов на них — не без ошибок и не без пауз между этапами. Если
                проект давно на площадке, это не повод доверять последней версии без своей проверки: каждый скачанный архив лучше прогонять отдельно, особенно после
                выхода обновления.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
