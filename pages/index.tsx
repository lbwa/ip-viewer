import { useState, useEffect } from 'react'
import Head from 'next/head'
import { css } from '@emotion/css'
import axios from 'axios'

const Home: React.FC<HomeProps> = function Home() {
  const [worldWide, setWorldWide] = useState('loading')
  const [localState, setLocalState] = useState('loading')

  useEffect(() => {
    axios
      .get<string>('https://myip.ipip.net')
      .then(({ data }) => setLocalState(data))
      .catch(() => setLocalState('failed'))

    axios
      .get<{ origin: string }>(
        'https://us-central1-ip-viewer-6.cloudfunctions.net/getRequestOrigin'
      )
      .then(({ data }) => setWorldWide(data.origin))
      .catch(() => setWorldWide('failed'))
    return () => {}
  }, [])
  return (
    <article
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <Head>
        <title>IP viewer</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main
        className={css`
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 52px);
        `}
      >
        {[
          ['world wide', worldWide],
          ['local', localState],
        ].map(([title, state]) => (
          <div
            className={css`
              min-width: 100px;
              text-align: center;
              text-transform: capitalize;
            `}
            key={title}
          >
            <h3>{title}</h3>
            <span>{state}</span>
          </div>
        ))}
      </main>
      <footer
        className={css`
          padding: 16px 0;
          background-color: #fafafa;
          text-align: center;
          width: 100%;
        `}
      >
        Copyright &copy; {new Date().getFullYear() || 2021}
      </footer>
    </article>
  )
}

export default Home

export type HomeProps = Partial<Record<string, unknown>>
