import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from "@/components/Header";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '@/styles/theme';
import createEmotionCache from '@/styles/emotionCache';
import {builder} from "@builder.io/react";

builder.init(process.env.BUILDER_API_KEY)

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Beeline Parks</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Bee Line Parks is a family friendly trailer park located in Port Bruce (Aylmer), Ontario" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify( {
              "@@context": "http://schema.org",
              "@@type": "RVPark",
              "address": {
                "@@type": "PostalAddress",
                "addressLocality": "Port Bruce",
                "addressRegion": "ON",
                "postalCode":"N5H2R2",
                "streetAddress": "3497 Colin Street"
              },
              "description": "Bee Line Parks is a family freindly trailer park located in Port Bruce Ontario",
              "name": "Beeline Parks",
              "telephone": "519-765-3151",
              "openingHours": ["Mo,Tu,We,Th,Fr 10:00-19:00", "Sa 10:00-17:00"],
              "geo": {
                "@@type": "GeoCoordinates",
                "latitude": "42.6537641",
                "longitude": "-81.0109611"
              },
              "hasMap": "https://www.google.ca/maps/place/Beelin+Trailer+Park/@@42.6537641,-81.0109611,17z/data=!3m1!4b1!4m5!3m4!1s0x882e6fecd114a845:0x6b61a05b4b119a40!8m2!3d42.6537641!4d-81.0087724",
            })
          }}
        />

    </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header/>
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};