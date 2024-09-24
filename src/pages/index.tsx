import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import { InferGetStaticPropsType } from "next";
import GlobalHead from "@/components/global-head";

export const getStaticProps = async () => { // ssg
  const [allMovies, recommendMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies()
  ])

  return {
    props: {
      allMovies,
      recommendMovies
    },
    revalidate: 3
  }
}

export default function Home({ allMovies, recommendMovies }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("test revalidate");
  
  return (
    <>
      <GlobalHead
        title="한입 씨네마"
        ogImage="/thumnail.png"
        ogTitle="한입 씨네마"
        description="한입 씨네마에 등록된 영화들을 만나보세요"
      />
      <div className={style.container}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={style.recommend_row}>
            {
              recommendMovies.slice(0, 3).map(movie => <MovieItem key={movie.id} {...movie} />)
            }
          </div>
        </section>
        <section>
          <h3>등록된 모든 영화</h3>
          <div className={style.all_content_container}>
            {
              allMovies.map(movie => <MovieItem key={movie.id} {...movie} />)
            }
          </div>
        </section>
      </div>
    </>)
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
