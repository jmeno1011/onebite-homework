import SearchbarLayout from "@/components/searchbar-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import movies from "@/mock/movie.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";

export default function Page() {
  const router = useRouter();
  const q = router.query.q as string;
  const result = movies.filter(movies => movies.title.includes(q));
  return <div className={style.container}>
    {result.length > 0 ? result.map(movie =>
      <MovieItem key={movie.id} {...movie} />
    ) : <div>검색 결과가 없습니다.</div>}
  </div>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
