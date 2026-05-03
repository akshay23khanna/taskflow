# TaskFlow

TaskFlow is a Next.js project management dashboard for engineering teams. It includes a sign-in/sign-up flow, KPI dashboard, charts, activity feed, and a project task management workspace with mock task data.

## Features

- Dashboard with KPI cards, task charts, activity feed, and assigned tasks
- Project and task management view with filtering, sorting, status updates, task details, and create task modal
- Demo login credentials for Admin and Member roles
- Responsive dark UI built with Tailwind CSS
- Next.js 15, React 19, TypeScript, Recharts, and Lucide icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:4028](http://localhost:4028) in your browser.

## Demo Credentials

Admin:

```text
Email: rohan.lal@acme-eng.io
Password: TaskFlow@Admin2026
```

Member:

```text
Email: priya.sharma@acme-eng.io
Password: TaskFlow@Member2026
```

## Scripts

- `npm run dev` starts the development server on port 4028
- `npm run build` creates a production build
- `npm run type-check` runs TypeScript checks
- `npm run lint` runs ESLint
- `npm run format` formats source files with Prettier

## Project Structure

```text
public/                 Static assets
src/app/                Next.js app routes
src/components/         Shared layout and UI components
src/styles/             Tailwind and global styles
```
