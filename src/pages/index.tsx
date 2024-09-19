import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import { InferGetStaticPropsType } from "next";

export const getStaticProps = async ()=>{ // ssg
    const [allMovies, recommendMovies ] = await Promise.all([
      fetchMovies(),
      fetchRandomMovies()
    ])
  
    return {
      props: {
        allMovies, 
        recommendMovies
      }
    }
  }

export default function Home({ allMovies, recommendMovies }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div className={style.container}>
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
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
