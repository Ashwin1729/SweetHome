import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";
import Search from "./components/Search";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/search?purpose=for-sale" element={<></>} />
        <Route exact path="/search?purpose=for-rent" element={<></>} />
      </Routes>
    </Layout>
  );
};

export default App;
