// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useGetApiConfigurationQuery } from "./features/homeslice/homeApiSlice";
import { setUrl } from "./features/homeslice/urlSlice";
import PageNotFound from "./pages/404/pageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import SearchResults from "./pages/searchResults/SearchResults";

function App() {
  const { data: Apiconfiguration } = useGetApiConfigurationQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    // set the url to the state so that we can use it at any page
    if (Apiconfiguration?.images) {
      const url = {
        profile: Apiconfiguration?.images?.secure_base_url + "w342",
        poster: Apiconfiguration?.images?.secure_base_url + "w185",
        backdrop: Apiconfiguration?.images?.secure_base_url + "original",
      };
      dispatch(setUrl(url));
    }
  }, [Apiconfiguration, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
