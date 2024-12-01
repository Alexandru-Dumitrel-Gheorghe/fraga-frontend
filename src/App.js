import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";
import Checkout from "./components/Checkout/Checkout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Footer from "./components/Footer/Footer"; // Importă componenta Footer
import "./styles/variables.css"; // Calea către fișierul CSS
import { CategoryProvider } from "./context/CategoryContext";

const App = () => {
  return (
    <CategoryProvider>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Ruta pentru toate produsele */}
            <Route path="/products" element={<ProductsPage />} />
            {/* Ruta pentru produse filtrate pe categorie */}
            <Route path="/products/:category" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer /> {/* Adaugă componenta Footer */}
      </div>
    </CategoryProvider>
  );
};

export default App;
