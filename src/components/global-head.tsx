import Head from 'next/head'
import React from 'react'

interface GlobalHeadProp {
  title: string;
  ogImage: string;
  ogTitle: string;
  description: string;
}

export default function GlobalHead({ title, ogImage, ogTitle, description }: GlobalHeadProp) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:image" content={ogImage} />
      <meta property="og:title" content={ogTitle} />
      <meta property="description" content={description} />
    </Head>
  )
}
