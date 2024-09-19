import React from 'react'
import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchOneMovie from '@/lib/fetch-one-movie';
import { useRouter } from 'next/router';

export const getStaticPaths = ()=>{
  return {
    paths: [],
    // paths의 보험 , path가 없을 경우의 옵션
    // fallback: false => 404, not found로 이동
    // fallback: blocking 즉시 생성 (Like SSR)
    // fallback: true 즉시 생성 + 페이지만 미리 반환 (props가 없는 상태 즉 getStaticProps의 데이터가 없는 상태로 렌더링)
    fallback: true
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

if(!movie){
  return {
    notFound: true
  }
}

  return {
    props: {
      movie
    }
  }
}

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // fallback 상태일 때 로딩 화면을 보여줌
  // fallback true 일때 데이터가 없는 상테이므로 잠깐의 딜레이가 발생 할 수 있어서 "로딩 중" 문구 필요
  if (router.isFallback) return "로딩중입니다."

  // 진짜 에러 발생
  if (movie === null) return "문제가 발생했습니다. 다시 시도하세요.";
  
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
          if (index + 1 === genres.length) {
            return (<span key={genre}>{genre}</span>)
          } else {
            return (<span key={genre}>{genre},</span>)
          }
        })}</div>
        <div>/</div>
        <div>{runtime}분</div>
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div>{description}</div>
    </div>
  )
}
