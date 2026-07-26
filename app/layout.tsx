import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Montserrat, Great_Vibes } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"



const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
})

const SITE_URL = "https://oromielmakeup.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oromiel Makeup | Maquillaje & Cuidado de la Piel",
    template: "%s | Oromiel Makeup",
  },
  description:
    "Oromiel Makeup — Tu nuevo lugar favorito para realzar tu belleza y cuidar tu piel en El Carmen de Chucurí, Santander. Belleza que te hace brillar.",
  keywords: [
    "maquillaje",
    "cuidado de la piel",
    "cosméticos",
    "belleza",
    "El Carmen de Chucurí",
    "Santander",
    "Oromiel",
    "tienda de maquillaje",
    "productos de belleza",
    "skincare",
  ],
  authors: [{ name: "Oromiel Makeup" }],
  creator: "Oromiel Makeup",
  publisher: "Oromiel Makeup",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "Oromiel Makeup",
    title: "Oromiel Makeup | Belleza que te hace brillar",
    description:
      "Maquillaje y cuidado de la piel en El Carmen de Chucurí, Santander. Encuentra los mejores productos para realzar tu belleza.",
    images: [
      {
        url: "/images/hero-makeup.png",
        width: 1200,
        height: 630,
        alt: "Oromiel Makeup - Productos de maquillaje y belleza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oromiel Makeup | Belleza que te hace brillar",
    description:
      "Maquillaje y cuidado de la piel en El Carmen de Chucurí, Santander.",
    images: ["/images/hero-makeup.png"],
    creator: "@oromiel_make.up",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#d4af6a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable} ${greatVibes.variable} bg-background`}
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased selection:bg-primary/15 selection:text-foreground">
        {children}
        <Suspense>
          {process.env.NODE_ENV === "production" && <Analytics />}
        </Suspense>
      </body>
    </html>
  )
}
