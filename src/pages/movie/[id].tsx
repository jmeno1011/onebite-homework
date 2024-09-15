import { useRouter } from 'next/router'
import React from 'react'
import style from "./[id].module.css";
import movies from "@/mock/movie.json";

export default function Page() {
  const router = useRouter();
  const id = router.query.id as string;
  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movies.filter(movie => String(movie.id) === id)[0];
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
