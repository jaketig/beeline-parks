import { BuilderComponent, Builder, builder } from '@builder.io/react';
import '@builder.io/widgets';
import { getAsyncProps } from '@builder.io/utils';
import '@/components/customBuilderComponents'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'


builder.init(process.env.BUILDER_API_KEY)

export async function getStaticProps({ params }) {
  const content = await builder.get('page', {
    userAttributes: {
      urlPath: '/' + (params?.page?.join('/') || ''),
    }
  })
    .toPromise() || null

  await getAsyncProps(content, {
    async WeatherForecast(props) {
      return {
        data: await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?id=5888716&units=metric&cnt=3&appid=${process.env.OPENWEATHER_API_KEY}`).then(res => res.json()),
        test: 'jake was here'
      }
    }
  })

  return {
    props: {
      content
    },
    revalidate: 1200
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true }
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: 'blocking'
    // fallback: true,
  }
}

export default function Page(props) {
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!props.content && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BuilderComponent model="page" content={props.content} />
    </>
  )
}