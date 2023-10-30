import UniList from "./UniList/UniList";
import Search from "./Search/Search";
import SavedList from "./SavedList/SavedList";

import "../App.css";

export default function Home() {
  return (
    <main className="main">
      <Search></Search>
      <SavedList></SavedList>
      <UniList></UniList>
    </main>
  );
}
