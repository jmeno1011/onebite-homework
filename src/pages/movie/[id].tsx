import { useRouter } from 'next/router'
import React from 'react'
import style from "./[id].module.css";
import movies from "@/mock/movie.json";
import { MovieData } from '@/types';

export default function Page() {
  const router = useRouter();
  const id = router.query.id as string;
  const movie = movies.filter(movie => String(movie.id) === id)[0] as MovieData;

  if (!movie) {
    return <div>존재하지 않는 영화 입니다.</div>;
  }
  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movie
  
  return (
    <div className={style.container}>
      <div style={{ backgroundImage: `url(${posterImgUrl})` }} className={style.poster_img_container}>
        <img src={posterImgUrl} alt={`${title}-image`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.movieInfo}>
        <div>{releaseDate}</div>
        <div>/</div>
        <div>{genres.map((genre, index) => {
          if(index+1 === genres.length){
            return (<span key={genre}>{genre}</span>)
          }else{
            return (<span key={genre}>{genre},</span>)
          }
        } )}</div>
        <div>/</div>
        <div>{runtime}분</div>
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div>{description}</div>
    </div>
  )
}
