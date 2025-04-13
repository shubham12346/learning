import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import CheckBox from "./component/CheckBox";
import ListWithViisulation from "./component/ListWithViisulation";
import { components } from "./constant";
import Header from "./component/Header";
import FileExplorer from "./component/FileExplorer";
function App() {
  return (
    <div className="bg-gray-700 h-screen px-5 py-5">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`${components[0].route}`} element={<CheckBox />} />
          <Route
            path={`${components[1].route}`}
            element={<ListWithViisulation />}
          />
          <Route path={`${components[2].route}`} element={<FileExplorer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
