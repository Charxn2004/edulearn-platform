# EduLearn Platform

A modern, full-featured educational platform built with Next.js, React, and TailwindCSS.

## Features
- Modular component-based architecture
- Modern UI/UX with TailwindCSS
- Authentication & user management (if implemented)
- Dashboard, course, and profile management (if implemented)
- Responsive and accessible design

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm comes with Node.js)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repo-url>
cd edulearn-platform
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 4. Build for Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

### 5. Linting
```bash
npm run lint
# or
yarn lint
```

## Project Structure
- `app/` — main application routes and pages
- `components/` — reusable UI components
- `hooks/` — custom React hooks
- `lib/` — utility libraries and helpers
- `public/` — static assets (images, etc.)
- `styles/` — global and component styles

## Customization
- Update `public/placeholder-logo.png` and other assets as needed
- Modify theme and config in `tailwind.config.ts` and `next.config.mjs`

## Useful Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run linter

## License
This project is for educational purposes.

---

Feel free to update this README with more specific instructions as your project evolves.
