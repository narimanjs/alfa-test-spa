import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import {
  HomePage,
  ProductsPage,
  CreateProductPage,
  ProductDetailsPage,
} from "@pages/index";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Layout />}
        >
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path='products'
            element={<ProductsPage />}
          />
          <Route
            path='products/:id'
            element={<ProductDetailsPage />}
          />
          <Route
            path='create-product'
            element={<CreateProductPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
