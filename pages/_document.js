import { Head } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Head>
        <script src="https://www.googletagmanager.com/gtag/js?id=G-24SMZDF52M" async />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-24SMZDF52M', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>
    );
  }
}