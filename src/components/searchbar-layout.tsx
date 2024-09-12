import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import style from "./searchbar-layout.module.css";

interface SearchbarLayout {
  children: ReactNode;
}

export default function SearchbarLayout({ children }: SearchbarLayout) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChange}
          type="text"
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
