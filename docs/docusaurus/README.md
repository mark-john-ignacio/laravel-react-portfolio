# Portfolio Documentation Site

This documentation site is built with [Docusaurus](https://docusaurus.io/), a modern static website generator.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Serve Production Build

```bash
npm run serve
```

## 📚 Documentation Structure

```
docs/
├── intro.md            # Landing page
├── design/             # Design documentation
├── ui-components/      # UI component guides
├── bug-fixes/          # Bug fix documentation
└── features/           # Feature documentation
```

## ✏️ Adding New Documentation

1. Create a new `.md` file in the appropriate category folder
2. Add frontmatter:
    ```md
    ---
    sidebar_position: 1
    title: Your Title
    ---
    ```
3. The document will automatically appear in the sidebar

## 📦 Deployment

### GitHub Pages

```bash
npm run deploy
```

This builds and deploys to the `gh-pages` branch.

## 🔧 Available Commands

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm start`      | Start development server |
| `npm run build`  | Build for production     |
| `npm run serve`  | Serve production build   |
| `npm run deploy` | Deploy to GitHub Pages   |
| `npm run clear`  | Clear cache              |

---

For more information, visit the [Docusaurus documentation](https://docusaurus.io/).
