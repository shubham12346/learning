import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import CheckBox from "./component/CheckBox";
import ListWithViisulation from "./component/ListWithViisulation";
import { components } from "./constant";
import Header from "./component/Header";
import ProgressBar from "./component/ProgressBar";
import SearchAndDebounce from "./component/SearchAndDebounce";
import BreadCrumb from "./component/BreadCrumb";
import useScreenType from "./hooks/useScreenType";
import ResponsiveCard from "./component/ResponsiveCard";
import { ToastProvider } from "./component/toastSystemDesign/ToastContext";
import OtpComponent from "./component/OtpComponent";
import CircleWithCursor from "./component/CircleWithCursor";
function App() {
  const { screenType } = useScreenType();
  console.log("screenType", screenType);
  return (
    <ToastProvider>
      <div className="bg-gray-700 min-h-screen  h-[100%] px-5 py-5 ">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`${components[0].route}`} element={<CheckBox />} />
            <Route
              path={`${components[1].route}`}
              element={<ListWithViisulation />}
            />
            <Route
              path={`${components[1].route}`}
              element={<ListWithViisulation />}
            />
            <Route path={`${components[3].route}`} element={<ProgressBar />} />
            <Route
              path={`${components[4].route}`}
              element={<SearchAndDebounce />}
            />
            <Route path={`${components[5].route}`} element={<BreadCrumb />} />
            <Route
              path={`${components[6].route}`}
              element={<ResponsiveCard />}
            />
            <Route path={`${components[8].route}`} element={<OtpComponent />} />
            <Route
              path={`${components[9].route}`}
              element={<CircleWithCursor />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ToastProvider>
  );
}
export default App;
