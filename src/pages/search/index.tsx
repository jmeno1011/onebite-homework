import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { useRouter } from "next/router";
import { InferGetStaticPropsType } from "next";


export const getStaticProps = async () =>{
// export const getStaticProps = async (context: GetStaticPropsContext) =>{
  // => GetStaticPropsContext don't have query property 
  // then occur the Error on the underline
  // const q = context.query.q as string; 
  // reference https://nextjs.org/docs/pages/api-reference/functions/get-static-props#context-parameter

  const movies = await fetchMovies();

  return {
    props: {
      movies
    }
  }
}

export default function Page({movies}: InferGetStaticPropsType<typeof getStaticProps>) {
  // const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q as string;

  // 최대한 ssg로 next build 결과에 따라서..!
  const result = movies.filter(movies => movies.title.includes(q));

  // const fetchSearchMovie = async () => {
  //   const data = await fetchMovies(q);
  //   setMovies(data);
  // }

  // useEffect(() => {
  //   if (q) {
  //     fetchSearchMovie();
  //   }
  // }, [q]);

  return <div className={style.container}>
    {result.length > 0 ? result.map(movie =>
      <MovieItem key={movie.id} {...movie} />
    ) : <div>검색 결과가 없습니다.</div>}
  </div>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
