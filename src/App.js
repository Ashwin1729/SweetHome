import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";
import Search from "./components/Search";
import PropertyDetails from "./components/PropertyDetails";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/search" element={<Search />} />
        {/* <Route exact path="/search?purpose=for-sale" element={<></>} />
        <Route exact path="/search?purpose=for-rent" element={<></>} /> */}
        <Route exact path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Layout>
  );
};

export default App;
