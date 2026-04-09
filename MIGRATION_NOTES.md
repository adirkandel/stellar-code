# Stellar Code: Vite SPA to TanStack Start Migration

## TanStack Start Docs Understanding

This section serves as proof of thorough documentation study before migration.

### Core Architecture Summary

TanStack Start is a **full-stack React framework** powered by TanStack Router. Key architectural points:

1. **Vite-based Build System**: Uses Vite for development and production builds with the `@tanstack/react-start/plugin/vite` plugin
2. **Nitro Server Runtime**: Leverages Nitro for the server runtime, enabling deployment to various platforms (Node.js, Cloudflare, Netlify, etc.)
3. **File-based Routing**: Routes are defined in `src/routes/` using TanStack Router's file naming conventions
4. **Isomorphic Execution**: Code runs on both server and client unless explicitly marked as server-only

### Key Differences vs. Vite SPA

| Aspect | Vite SPA | TanStack Start |
|--------|----------|----------------|
| Routing | React Router DOM (client-side) | TanStack Router (file-based, SSR-aware) |
| Rendering | Client-side only | SSR by default, streaming support |
| Data Loading | useEffect, React Query | Route loaders (isomorphic), server functions |
| SEO | Requires workarounds (prerendering) | Native SSR, head() management |
| Entry Point | main.tsx with ReactDOM.render | router.tsx + __root.tsx shell |
| API Calls | Client-side fetch | Server functions (createServerFn) |

### Key Differences vs. Next.js

| Aspect | Next.js | TanStack Start |
|--------|---------|----------------|
| Routing Model | File-based (pages/app dir) | File-based with explicit route files |
| Server Components | React Server Components | Server Functions (RPC-style) |
| Data Fetching | getServerSideProps, Server Components | loader(), beforeLoad(), createServerFn() |
| Metadata | generateMetadata() | head() route option |
| Bundler | Turbopack/Webpack | Vite |
| Hydration | Automatic | Explicit via shellComponent |

### Constraints and Rules Affecting Migration

1. **Loaders are Isomorphic**: Route `loader` and `beforeLoad` functions run on BOTH server and client. Use `createServerFn()` for server-only code.

2. **File Naming Conventions**:
   - `__root.tsx` - Root layout (required)
   - `index.tsx` - Index route for a directory
   - `$param.tsx` - Dynamic route segment
   - `_layout.tsx` - Layout routes (pathless)
   - `.lazy.tsx` - Code-split components

3. **Server Function Files**:
   - `.functions.ts` - Export `createServerFn` wrappers (safe to import anywhere)
   - `.server.ts` - Server-only code (only imported inside server function handlers)
   - `.ts` (no suffix) - Client-safe code (types, schemas, constants)

4. **Head Configuration**: Must use the `head` route option for SEO; returns `{ meta, links, scripts }`

5. **Required Components**:
   - `<HeadContent />` - Renders meta tags in head
   - `<Scripts />` - Renders script tags for hydration
   - `shellComponent` - The HTML document shell

### SEO-Relevant Behaviors

1. **SSR Enabled by Default**: All routes render on server first, ensuring crawlers receive full HTML

2. **Streaming SSR**: Content streams progressively, but critical meta tags are sent immediately

3. **Head Tag Deduplication**: Nested routes override parent meta tags with same name/property

4. **Selective SSR**: Can disable SSR per-route via `routeOptions.ssr: false`

5. **Static Prerendering**: Supports ISR (Incremental Static Regeneration)

6. **Canonical URLs**: Set via `links` array in `head()`:
   ```typescript
   head: () => ({
     links: [{ rel: 'canonical', href: 'https://example.com/page' }]
   })
   ```

7. **Open Graph / Twitter Cards**: Set via `meta` array:
   ```typescript
   head: () => ({
     meta: [
       { property: 'og:title', content: 'Page Title' },
       { property: 'og:description', content: 'Description' },
       { property: 'og:image', content: 'https://example.com/og.jpg' },
       { name: 'twitter:card', content: 'summary_large_image' },
     ]
   })
   ```

### SSE/Real-time Data Limitations

1. **Server Functions are RPC-style**: Not designed for persistent connections
2. **SSE requires custom server routes**: Use `src/routes/api/` for API endpoints
3. **Streaming in Loaders**: TanStack Start supports streaming responses in loaders for progressive data loading
4. **WebSocket considerations**: Nitro supports WebSockets but requires specific deployment targets

---

## Migration Plan

### Source Project Analysis

**Technology Stack (Vite SPA)**:
- React 18.3.1 with React Router DOM 6.30.1
- TanStack Query for data fetching
- Tailwind CSS 3.x with tailwindcss-animate
- shadcn/ui components (Radix UI primitives)
- Supabase client for backend
- Embla Carousel, react-hook-form, zod

**Project Structure**:
- Single-page app with hash-based section navigation
- Landing page with: Hero, Solutions, Services, Technologies, Testimonials, Why Us, Contact, Footer
- Contact form submitting to Supabase Edge Function

### Migration Steps

#### Phase 1: Project Setup
1. Update package.json with required dependencies
2. Configure Tailwind CSS v4 integration
3. Set up path aliases in tsconfig.json

#### Phase 2: Component Migration
1. Copy all components from `stellar-code spa/src/components/` to `stellar-code/src/components/`
2. Copy UI components directory
3. Copy assets directory
4. Copy hooks and lib utilities
5. Adapt imports for TanStack Start conventions

#### Phase 3: Routing Configuration
1. Update `__root.tsx` with proper document shell
2. Create main `index.tsx` route with all sections
3. Configure head() for SEO
4. Set up NotFound route

#### Phase 4: Integration Adaptation
1. Migrate Supabase client (handle SSR-safe initialization)
2. Configure environment variables
3. Adapt TanStack Query setup

#### Phase 5: SEO Implementation
1. Configure comprehensive meta tags
2. Add Open Graph tags
3. Add Twitter Card tags
4. Set canonical URLs
5. Add structured data (JSON-LD)
6. Create sitemap.xml
7. Configure robots.txt

### Assumptions

1. The target TanStack Start project is a fresh installation ready for customization
2. Supabase Edge Functions remain unchanged (only client needs migration)
3. Hash-based navigation (#section) will be converted to scroll behavior
4. No backend API routes are needed beyond Supabase
5. React 19 compatibility is acceptable (TanStack Start uses React 19)

### Breaking Changes

1. **React Version**: Upgrading from React 18 to React 19
   - Some Radix UI components may need updates
   - `useEffect` cleanup behavior slightly different

2. **Routing Library**: React Router DOM -> TanStack Router
   - No `<BrowserRouter>`, `<Routes>`, `<Route>` components
   - Navigation via `<Link>` from TanStack Router

3. **CSS Framework**: Tailwind CSS 3.x -> 4.x
   - Configuration syntax changes
   - Some utility classes may differ

4. **Toast System**: May need adaptation for SSR context

### Required Manual Steps

1. Update environment variables in deployment platform
2. Verify Supabase client works in SSR context
3. Test contact form submission
4. Verify all images load correctly
5. Test responsive design
6. Validate SEO with Google tools
7. Set up proper deployment configuration

---

## SEO Migration Analysis

### SEO Gains (from SPA to SSR)

1. **Full SSR**: Search engines receive complete HTML instead of empty shell
2. **Meta Tag Control**: Native support for dynamic meta tags
3. **Faster FCP/LCP**: Content visible without JavaScript execution
4. **Better Core Web Vitals**: Streaming reduces TTFB impact
5. **Structured Data**: Easy JSON-LD integration
6. **Social Preview**: Reliable Open Graph rendering

### SEO Risks

1. **Hydration Errors**: Mismatches between server/client render
2. **Dynamic Content**: Ensure critical content is SSR'd
3. **JavaScript-dependent Features**: Verify they degrade gracefully
4. **URL Changes**: If any routes change, set up redirects

### SEO Regressions to Watch

1. **Meta Tag Duplication**: Test with Google Search Console
2. **Render Blocking**: Monitor with Lighthouse
3. **Mobile Performance**: Test all breakpoints
4. **Crawl Budget**: Monitor indexing in Search Console
5. **Schema Validation**: Test with Rich Results Test

---

## Sources

- [TanStack Start Overview](https://tanstack.com/start/latest/docs/framework/react/overview)
- [Server Functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)
- [SEO Guide](https://tanstack.com/start/latest/docs/framework/react/guide/seo)
- [Document Head Management](https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management)
- [File Naming Conventions](https://tanstack.com/router/v1/docs/framework/react/routing/file-naming-conventions)
- [Execution Model](https://tanstack.com/start/latest/docs/framework/react/guide/execution-model)
