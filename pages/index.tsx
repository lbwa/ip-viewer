import { useState, useEffect } from 'react'
import Head from 'next/head'
import { css } from '@emotion/css'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'

enum Url {
  LOCAL = 'https://myip.ipip.net', // 'https://api64.ipify.org?format=json'
  OVERSEA = 'https://us-central1-ip-viewer-6.cloudfunctions.net/getRequestOrigin',
}

const Home: React.FC<HomeProps> = function Home() {
  const [overseaState, setOverseaState] = useState('loading')
  const [localState, setLocalState] = useState('loading')

  useEffect(() => {
    ajax({
      url: Url.LOCAL,
      responseType: 'text',
    })
      .pipe(map((r) => r.response))
      .subscribe(
        (res) => setLocalState(res),
        () => setLocalState(`Failed`)
      )

    ajax(Url.OVERSEA)
      .pipe(map((r) => r.response))
      .subscribe(
        (res) => setOverseaState(res.origin),
        () => setOverseaState(`Failed`)
      )

    // zip(
    //   of({ url: Url.LOCAL, responseType: 'text' }, Url.OVERSEA).pipe(
    //     // mergeMap 将不保证 subscriber 中收到的结果顺序
    //     mergeMap((opt) => ajax(opt))
    //   ),
    //   of(setLocalState, setOverseaState)
    // ).subscribe(([{ response }, setter]) =>
    //   setter(typeof response === 'string' ? response : response.ip)
    // )

    // zip(
    //   of({ url: Url.LOCAL, responseType: 'text' }, Url.OVERSEA).pipe(
    //     // concatMap 虽能保证结果顺序，但将导致按序列请求，而非并发
    //     concatMap((opt) =>
    //       ajax(opt).pipe(
    //         map(({ response }) =>
    //           typeof response === 'object' ? response.ip : response
    //         ),
    //         map((res) => (console.log(res), res))
    //       )
    //     ),
    //     materialize()
    //   ),
    //   of(setLocalState, setOverseaState)
    // ).subscribe(([{ hasValue, value }, setter]) => {
    //   hasValue && setter(value)
    //   console.log('hasValue, value', hasValue, value)
    // })

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
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          height: calc(100vh - 52px);
        `}
      >
        {[
          ['Oversea state', overseaState],
          ['Local state', localState],
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
