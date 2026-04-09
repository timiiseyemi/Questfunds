import type { Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700']
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Vestory - Business Loans & Investment Platform | Nigeria',
  description: 'Grow your business with flexible loans or earn competitive returns on your investments. Trusted by 10,000+ Nigerians for business financing and wealth building.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/1.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/1.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/3.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
