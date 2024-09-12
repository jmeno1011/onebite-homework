import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";

export default function Home() {
  return <h1>ONEBITE CINEMA 홈 입니다~!</h1>;
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
