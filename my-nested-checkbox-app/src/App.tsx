import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import CheckBox from "./component/CheckBox";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
