import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/search" element={<Homepage />} />
        <Route exact path="/search?purpose=for-sale" element={<Homepage />} />
        <Route exact path="//search?purpose=for-rent" element={<Homepage />} />
      </Routes>
    </Layout>
  );
};

export default App;
