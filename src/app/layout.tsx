import '@/styles/_globals.scss'
import { AppProvider } from '@/context/Context'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AppProvider>
      <html lang='fr'>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </AppProvider>
  )
}
