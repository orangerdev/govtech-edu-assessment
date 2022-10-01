import Document, { Html, Head, Main, NextScript } from "next/document"
import React from "react"
import { ServerStyleSheet } from "styled-components"

export default class Doc extends Document {
  static async getInitialProps(context: any) {
    const sheet: any = new ServerStyleSheet()
    const originalRenderPage: any = context.renderPage
    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps: any = await Document.getInitialProps(context)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="id-ID">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
