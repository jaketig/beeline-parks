// import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react';
import '@builder.io/widgets';
import '@/components/customBuilderComponents'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'

builder.init(process.env.BUILDER_API_KEY)

export async function getStaticProps({ params }) {
  const page = await builder.get('page', {
    userAttributes: {
      urlPath: '/' + (params?.page?.join('/') || ''),
    }
  })
    .toPromise() || null

  return {
    props: {
      page,
    },
    revalidate: 5,
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

export default function Page({ page }) {
  // const router = useRouter()
  // // if (router.isFallback) {
  // //   return <h1>Loading...</h1>
  // // }
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!page && isLive) {
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

      <BuilderComponent model="page" content={page} />
    </>
  )
}