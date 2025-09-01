export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1f2937" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Additional favicon formats */}
      <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/favicon_io/site.webmanifest" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileColor" content="#1f2937" />
      <meta name="msapplication-config" content="/favicon_io/browserconfig.xml" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </>
  )
}
