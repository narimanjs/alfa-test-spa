import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "@pages/HomePage/HomePage";
import ProductsPage from "@pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "@pages/ProductDetailsPage/ProductDetailsPage";
import CreateProductPage from "@pages/CreateProductPage/CreateProductPage";

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
