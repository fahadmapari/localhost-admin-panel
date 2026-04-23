# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (Vite HMR)
npm run dev

# Production build (TS check + Vite bundle → dist/)
npm run build

# Lint
npm run lint

# Preview production build locally
npm run preview
```

No test framework is configured.

## Architecture

React 19 SPA with React Router v7, Zustand for auth state, SWR for server data, and shadcn/ui components (Radix UI + Tailwind CSS 4).

**Key conventions:**
- `src/pages/` — One file per route, grouped by domain (`product/`, `client/`, `admin/`, etc.)
- `src/components/ui/` — shadcn/ui primitives; do not modify directly, extend via composition
- `src/components/common/` — Shared feature components (`DataTable`, `AlertModal`, `PageHeading`, etc.)
- `src/components/<domain>/` — Domain-specific components co-located with their pages
- `src/hooks/` — Custom hooks (debounce, pagination, image upload, responsive)
- `src/schemas/` — Zod schemas; always paired with React Hook Form via `zodResolver`
- `src/store/` — Zustand stores (currently only `auth.store.ts`)
- `src/lib/axios/` — Axios instance, token management, and silent token refresh logic

## Routing

Routes are defined in `src/main.tsx` using `createBrowserRouter`. The root `"/"` route uses `loader: routeProtector` (`src/loaders/routeProtector.ts`) which validates auth before rendering — unauthenticated users are redirected to `/login`. `App.tsx` is the layout shell (sidebar + `<Outlet>`).

## Authentication Flow

1. On app load, `AuthProvider` (`src/providers/AuthProvider.tsx`) calls `POST /auth/refresh` (cookie-based) to restore the session
2. On success, the access token is stored in Zustand (`auth.store.ts`) and set as `Authorization: Bearer <token>` on the Axios instance via `setAuthToken()` (`src/lib/axios/token.ts`)
3. The Axios response interceptor (`src/lib/axios/index.ts`) silently refreshes the token on `401 jwt expired` and retries the original request
4. Logout clears the Zustand store, removes the header, and calls `POST /auth/signout`

## Data Fetching

Use **SWR** for GET requests — it handles caching and deduplication. Pass the Axios instance as the fetcher.

```typescript
const { data, error, isLoading } = useSWR(
  `/products?page=${page}&limit=${limit}`,
  (url) => api.get(url).then(res => res.data?.data)
);
```

Use plain `api.post/patch/delete` calls (not SWR) for mutations, then call `mutate()` to revalidate SWR cache.

Backend base URL comes from `VITE_BACKEND_API_URL` env variable.

## Forms

All forms use **React Hook Form** + **Zod**:

```typescript
const form = useForm<z.infer<typeof mySchema>>({
  resolver: zodResolver(mySchema),
  defaultValues: { ... },
});
```

Schemas live in `src/schemas/`. Form UI uses the shadcn `<Form>` wrapper components from `src/components/ui/form.tsx`.

## Tables

Use the shared `<DataTable>` component (`src/components/common/DataTable.tsx`) backed by TanStack React Table. Define columns with `ColumnDef<TData>` and pass them alongside the data array.

## Real-time (Socket.io)

Socket.io-client connects to the backend for the messaging feature (`src/pages/communication/`). Join rooms per conversation ID; emit/listen to message events.

## Styling

Tailwind CSS 4 via `@tailwindcss/vite` plugin (no `tailwind.config.js` — configuration is in CSS). Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional classes. Use CVA (`class-variance-authority`) for component variant definitions.

The `@` alias maps to `src/`. Import as `@/components/...`, `@/lib/...`, etc.

## Environment Variables

```
VITE_BACKEND_URL=http://localhost:5500
VITE_BACKEND_API_URL=http://localhost:5500/api/v1
```

All Vite env vars must be prefixed `VITE_` to be accessible in the browser.
