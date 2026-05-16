# ModrinthProxy

Веб-интерфейс для Modrinth на русском языке. Простой доступ к модам, плагинам, шейдерам и другому контенту для Minecraft без VPN и лишних заморочек.

Все файлы качаются напрямую с CDN Modrinth. Мы не храним моды у себя - только делаем удобный интерфейс и кэшируем описания.

**Сайт:** https://modrinth.black/

## For rights holders

> No drama — your work has **not been stolen**. We are only a small **proxy** in front of a great platform.
>
> We simply can’t build the same kind of payment system Modrinth has — royalties for views and downloads require infrastructure way beyond what we can realistically run. And to be clear: we make absolutely nothing from this site. No money from traffic, no money from downloads — we actually pay for the servers ourselves just to keep it alive. So please try to understand us too — we love Minecraft just as much as you do.
>
> Some authors assume we — the people behind this project — **oppose** the content we’re sometimes **forced** to filter. That is **absolutely not** the case: we’re **not against** that work. Restrictions exist only because we’re **obliged** to apply them so **modrinth.com** stays reachable here, **not** because we dislike you or your project.
>
> So extend a bit of goodwill and **please don’t demand we remove your project** from our pages over that alone.

## Быстрые ссылки

- **[Моды](https://modrinth.black/discover/mods)** - модификации для Minecraft
- **[Плагины](https://modrinth.black/discover/plugins)** - плагины для серверов
- **[Модпаки](https://modrinth.black/discover/modpacks)** - готовые сборки модов
- **[Шейдеры](https://modrinth.black/discover/shaders)** - графические улучшения
- **[Ресурспаки](https://modrinth.black/discover/resourcepacks)** - текстуры и звуки
- **[Датапаки](https://modrinth.black/discover/datapacks)** - игровая механика

- **[Лаунчер](https://modrinth.black/app)** - официальный лаунчер Modrinth

## О проекте

Modrinth - один из лучших сайтов для модов Minecraft, но в России к нему хреновый доступ. Этот проект решает проблему - работает через их публичный API, показывает весь контент на русском, фильтрует то что надо по закону.

**Как работает:**
- Вы открываете сайт и ищете мод
- Мы запрашиваем инфу через Modrinth API v3
- Показываем описание, версии, скриншоты
- Файлы качаются напрямую с cdn.modrinth.com
- Ничего не храним у себя, только кэшируем метаданные (от 3 часов до 7 дней в зависимости от типа данных)

**Почему это легально:**
- Используем публичный API Modrinth (никаких парсеров)
- Файлы идут с их CDN, мы их не трогаем
- Фильтруем контент по требованиям РКН через JSON blacklist'ы
- Open source, всё прозрачно

## Что умеет

- Полный каталог Modrinth - моды, плагины, шейдеры, ресурспаки, датапаки, модпаки
- Поиск с фильтрами по версиям Minecraft, загрузчикам (Fabric/Forge/NeoForge/Quilt), категориям
- Работает на телефонах и планшетах
- Весь интерфейс на русском
- Автоматическая фильтрация запрещённого контента (РКН blacklist)
- Агрессивное кэширование - не нагружаем API Modrinth лишний раз

## Деплой на Vercel 
(хотя в рф та же фигня, и он не доступен)

### Через GitHub (рекомендуется)

1. Загрузите проект на GitHub
2. Зайдите на [vercel.com](https://vercel.com)
3. Нажмите **Import Project**
4. Выберите ваш GitHub репозиторий
5. Vercel автоматически определит настройки Next.js
6. Нажмите **Deploy**

## Локальная разработка

Если основной сайт недоступен или достиг лимитов API, вы можете запустить собственную копию локально:

```bash
# Клонировать репозиторий
git clone https://github.com/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy.git
cd modrinth-proxy

# Установить зависимости
npm install

# Запустить локально
npm run dev
```

Сайт будет доступен по адресу `http://localhost:3000`. Все запросы к Modrinth API будут идти от вашего IP, поэтому у вас будет собственный лимит запросов.

### Запуск для новичков

**Если вы не знакомы с Git:**

1. **Скачайте проект:**
   - Поднимитесь на верх этой страницы
   - Нажмите зелёную кнопку **Code**
   - Выберите **Download ZIP**
   - Распакуйте скачанный архив

2. **Откройте терминал:**
   - Зайдите в распакованную папку `modrinth-proxy-master`
   - **Windows 10/11:** Нажмите ПКМ в пустом месте папки → **Открыть в терминале**
   - **Windows 7/8:** Зажмите Shift + ПКМ → **Открыть окно команд здесь**
   - **macOS:** ПКМ → **Службы** → **Новый терминал в папке**
   - **Linux:** ПКМ → **Открыть терминал здесь**

3. **Установите зависимости:**
   ```bash
   npm install
   ```
   Дождитесь завершения установки (может занять несколько минут)

4. **Запустите сайт:**
   ```bash
   npm run dev
   ```

5. **Откройте в браузере:**
   - Перейдите по адресу: [http://localhost:3000](http://localhost:3000)
   - Готово! Ваша локальная копия ModrinthProxy запущена

**Остановка сервера:** Нажмите `Ctrl+C` в терминале, или просто закройте терминал.

## Технологии

- **Next.js 14** (App Router) - React фреймворк с SSR/SSG
- **Tailwind CSS** - утилитарный CSS фреймворк
- **Modrinth API v3** - источник данных
- **React Markdown** - рендеринг описаний

Подробнее о технологиях и инфраструктуре можно узнать на [https://modrinth.black/bmadnco](https://modrinth.black/bmadnco)


## Особенности реализации

### Фильтрация контента

Сайт блокирует контент через систему блокировок.

**Структура блокировок:**

Все блокировки хранятся в JSON файлах в директории `lib/blacklist/`:
- `projects-mods.json` - заблокированные моды
- `projects-resourcepacks.json` - заблокированные ресурспаки  
- `projects-datapacks.json` - заблокированные датапаки
- `projects-modpacks.json` - заблокированные модпаки
- `organizations.json` - заблокированные организации
- `users.json` - заблокированные пользователи (по ID)
- `url-patterns.json` - заблокированные URL паттерны (изображения в описаниях)
- `avatar-patterns.json` - заблокированные паттерны аватарок (замена на `/icon.png`)
- `words.json` - заблокированные слова

**Добавление в блокировку:**

Просто отредактируйте соответствующий JSON файл:

**Проекты (по slug):**
```json
[
  "project-slug-1",
  "project-slug-2"
]
```

**Пользователи (по ID):**
```json
[
  "ID-юзера",
  "Ник юзера"
]
```

Заблокированный контент:
- Не отображается в результатах поиска
- Показывается счетчик заблокированных элементов
- При попытке прямого доступа показывается страница с уведомлением
- Автоматически фильтруется на всех страницах сайта
- Заблокированные пользователи показывают страницу РКН вместо профиля
- Проекты заблокированных пользователей не отображаются в их профилях
- Заблокированные изображения заменяются на красивую плашку с уведомлением
- Заблокированные аватарки заменяются на дефолтную иконку сайта (`/icon.png`)

### Кеширование

API запросы кешируются через встроенную систему Next.js (`revalidate`):
- Поиск проектов: 10800 секунд (3 часа)
- Детали проектов: 43200 секунд (12 часов)
- Версии проектов: 21600 секунд (6 часов)
- Детали версии: 21600 секунд (6 часов)
- Команда проекта: 86400 секунд (24 часа)
- Пользователи: 43200 секунд (12 часов)
- Версии Minecraft: 86400 секунд (24 часа)
- Категории: 604800 секунд (7 дней)
- Подсчёт творений на главной: 86400 секунд (24 часа)

