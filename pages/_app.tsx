import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import 'normalize.css'
import { globalStyle } from '../styles/theme'

function _app({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      {globalStyle}
      <Component {...pageProps} />
    </CacheProvider>
  )
}

export default _app
