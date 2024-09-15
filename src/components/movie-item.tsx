import { MovieData } from '@/types'
import Link from 'next/link'
import React from 'react'
import style from "./movie-item.module.css";

export default function MovieItem({
  id,
  posterImgUrl,
}: MovieData) {
  return (
    <Link href={`/movie/${id}`}>
      <img src={posterImgUrl} className={style.postImg} />
    </Link>
  )
}
