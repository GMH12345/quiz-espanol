// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* VTurb - pré-carregamento e otimização */}
        <link
          rel="preload"
          href="https://scripts.converteai.net/4631aa7e-e33f-4476-a08d-394dbb8b90c6/players/682e340490a56fec06896513/player.js"
          as="script"
        />
        <link
          rel="preload"
          href="https://scripts.converteai.net/lib/js/smartplayer/v1/smartplayer.min.js"
          as="script"
        />
        <link
          rel="preload"
          href="https://images.converteai.net/4631aa7e-e33f-4476-a08d-394dbb8b90c6/players/682e340490a56fec06896513/thumbnail.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="https://cdn.converteai.net/4631aa7e-e33f-4476-a08d-394dbb8b90c6/682e309bb79afdaf3d42b91b/main.m3u8"
          as="fetch"
        />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://api.vturb.com.br" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
