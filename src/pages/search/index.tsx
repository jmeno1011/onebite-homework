import SearchbarLayout from "@/components/searchbar-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import movies from "@/mock/movie.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q as string;

  const movies = await fetchMovies(q);

  return {
    props: {
      movies
    }
  }
}

export default function Page({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // const router = useRouter();
  // const q = router.query.q as string;
  // const result = movies.filter(movies => movies.title.includes(q));

  return <div className={style.container}>
    {movies.length > 0 ? movies.map(movie =>
      <MovieItem key={movie.id} {...movie} />
    ) : <div>검색 결과가 없습니다.</div>}
  </div>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
