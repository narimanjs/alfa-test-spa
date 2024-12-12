import React from "react";
import {
  BrowserRouter as Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import {
  HomePage,
  ProductsPage,
  CreateProductPage,
  ProductDetailsPage,
  ProductEditPage,
} from "@pages/index";

const App: React.FC = () => {
  return (
    <BrowserRouter basename='/alfa-test-spa'>
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
            path='products/:id/edit'
            element={<ProductEditPage />}
          />
          <Route
            path='create-product'
            element={<CreateProductPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
