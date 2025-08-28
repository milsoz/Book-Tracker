import type { Route } from "./+types/home";
import List from "~/components/List";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Tracker" },
    { name: "description", content: "Very simple book tracker" },
  ];
}

export default function Home() {
  return (
    <>
      <List />
    </>
  );
}
