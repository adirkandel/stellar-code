import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Toaster } from '@/components/ui/toaster'
import appCss from '../styles.css?url'

// SEO Configuration
const siteConfig = {
  title: 'Stellar Code | Elite Software Development Teams for SaaS Startups',
  description: 'Build and expand your product with top-tier engineers. Stellar Code provides dedicated developers, full-stack development, and cloud infrastructure solutions for ambitious SaaS startups.',
  url: 'https://stellar-code.dev',
  ogImage: '/og-image.jpg',
  twitterHandle: '@stellarcode',
}

function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-space text-2xl font-bold text-stellar-white">Page not found</h1>
      <p className="text-muted-foreground text-sm max-w-md">
        There is no page at this URL. If you opened a link, it may be broken or the page was
        removed.
      </p>
      <Link
        to="/"
        className="text-primary font-medium underline underline-offset-4 hover:text-primary/90"
      >
        Back to home
      </Link>
    </div>
  )
}

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteConfig.title },
      { name: 'description', content: siteConfig.description },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: siteConfig.url },
      { property: 'og:title', content: siteConfig.title },
      { property: 'og:description', content: siteConfig.description },
      { property: 'og:image', content: `${siteConfig.url}${siteConfig.ogImage}` },
      { property: 'og:site_name', content: 'Stellar Code' },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: siteConfig.twitterHandle },
      { name: 'twitter:title', content: siteConfig.title },
      { name: 'twitter:description', content: siteConfig.description },
      { name: 'twitter:image', content: `${siteConfig.url}${siteConfig.ogImage}` },

      // Additional SEO
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'author', content: 'Stellar Code' },
      { name: 'theme-color', content: '#8b5cf6' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: siteConfig.url },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      // Preconnect for performance
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      // Google Fonts - Space Grotesk
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap' },
    ],
    scripts: [
      // JSON-LD Structured Data
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Stellar Code',
          url: siteConfig.url,
          logo: `${siteConfig.url}/stellarcode-logo.svg`,
          description: siteConfig.description,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'akandel@stellar-code.dev',
          },
          sameAs: [
            'https://linkedin.com/company/stellar-code',
            'https://github.com/stellar-code',
          ],
          services: [
            'Full-Stack Web Development',
            'Cloud Infrastructure & DevOps',
            'Dedicated Developers',
            'Team Training & Leadership',
          ],
        }),
      },
    ],
  }),

  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-deep-space text-stellar-white antialiased">
        <Outlet />
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}
