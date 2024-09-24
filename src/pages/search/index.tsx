import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { useRouter } from "next/router";
import GlobalHead from "@/components/global-head";
import { MovieData } from "@/types";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  // 최대한 ssg로 next build 결과에 따라서..!
  const result = movies.filter(movies => movies.title.includes(q));

  const fetchSearchResult = async()=>{
    const data = await fetchMovies(q);
    setMovies(data);
  }

  useEffect(()=>{
    if(q){
      fetchSearchResult();
    }
  },[q])
  
  return (
    <>
    <GlobalHead
        title={`${q} 한입 씨네마 검색`}
        ogImage="/thumnail.png"
        ogTitle="한입 씨네마"
        description="한입 씨네마에 등록된 영화들을 만나보세요"
      />
  <div className={style.container}>
    {result.length > 0 ? result.map(movie =>
      <MovieItem key={movie.id} {...movie} />
    ) : <div>검색 결과가 없습니다.</div>}
  </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
