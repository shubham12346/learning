import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import CheckBox from "./component/CheckBox";
import ListWithViisulation from "./component/ListWithViisulation";
import { components } from "./constant";
import Header from "./component/Header";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`${components[0].route}`} element={<CheckBox />} />
          <Route
            path={`${components[1].route}`}
            element={<ListWithViisulation />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
