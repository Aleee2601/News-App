import React from "react";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./config/config";
import Search from "./components/Search/Search";

function App() {
  
  return (
    <Router>
      <NavBar />
      <Routes>
        {router.map((path, index) => (
          <Route
            exact
            key={index}
            path={path.path}
            element={
              <News newscategory={path.category} country={path.country} />
            }
          />
        ))}
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
