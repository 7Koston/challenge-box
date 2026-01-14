# Challenge Box Game 🎲

An interactive web application that randomly displays challenges from a user-uploaded text file. Perfect for team building activities, random decision making, or game nights! [Available here](https://7koston.github.io/challenge-box)

## ✨ Features

- **📁 File Upload**: Upload a `.txt` file with challenges (one per line) via click or drag & drop
- **🎯 Random Selection**: Click to reveal random challenges from your uploaded list
- **🌍 Internationalization**: Multi-language support (English, Russian)
- **🎨 Theme Support**: Light/dark mode with high contrast variants
- **📱 Responsive Design**: Works seamlessly across all devices
- **⚡ Fast & Modern**: Built with Nuxt 4.x and Vue 3

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4.x](https://nuxt.com/)
- **UI Library**: Vue 3 with TypeScript
- **Styling**: Custom CSS with Material Design themes
- **Icons**: [@nuxt/icon](https://nuxt.com/modules/icon) with Iconify
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Color Mode**: [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier + Husky
- **Deployment**: GitHub Pages (static generation)

## 📋 Prerequisites

- Node.js >= 24.12.0
- pnpm >= 10.28.0

## 🚀 Setup

Install dependencies:

```bash
pnpm install
```

## 💻 Development

Start the development server on `http://localhost:3000`:

```bash
pnpm local
```

Build the application for production:

```bash
pnpm build
```

## 🧹 Maintenance Scripts

```bash
# Clean Nuxt cache
pnpm clean

# Full clean (includes node_modules and lock file)
pnpm clean:full

# Reinstall dependencies from scratch
pnpm reinstall

# Upgrade dependencies
pnpm upgrade

# Lint code
pnpm lint

# Lint and fix
pnpm lint:fix

# Format code
pnpm format
```

## 📂 Project Structure

```
challenge-box/
├── app/
│   ├── assets/          # CSS themes and icons
│   ├── components/      # Vue components (ThemeToggle)
│   ├── pages/           # Application pages
│   └── app.vue          # Root component
├── i18n/
│   └── locales/         # Translation files (en, ru)
├── public/              # Static assets
└── nuxt.config.ts       # Nuxt configuration
```

## 🌐 Internationalization

The app supports multiple languages:

- English (default)
- Russian

Add more languages by creating new JSON files in `i18n/locales/` and updating `nuxt.config.ts`.

## 🎨 Theming

The application includes:

- Light mode
- Dark mode
- High contrast variants

Themes are automatically applied based on user preference and can be toggled via the ThemeToggle component.

## 📝 Usage

1. Open the application
2. Upload a `.txt` file with challenges (one challenge per line)
3. Click anywhere on the screen to reveal a random challenge
4. Continue clicking to see more challenges
5. Upload a new file anytime to start fresh

## 📄 License

GPL-3.0-only

## 👤 Author

7Koston

---

Built with [Nuxt](https://nuxt.com/) and ❤️
