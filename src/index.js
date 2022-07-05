import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "./components/Layout";
import NProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Heading></Heading>
    <ChakraProvider>
      <Layout>
        <App />
      </Layout>
    </ChakraProvider>
  </>
);
