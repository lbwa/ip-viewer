import {
  default as RawDocument,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { extractCritical } from '@emotion/server'

export default class Document extends RawDocument {
  static async getInitialProps(context) {
    const props = await RawDocument.getInitialProps(context)
    const styles = extractCritical(props.html)
    return {
      ...props,
      styles: (
        <>
          {props.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
