import '@/styles/_globals.scss'
import { AppProvider } from '@/context/Context'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='fr'>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
