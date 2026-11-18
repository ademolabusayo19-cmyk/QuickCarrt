import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import CategoriesPage from "./pages/shop/CategoriesPage";
import ProductDetailsPage from "./pages/shop/ProductDetailsPage";

import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/cart/CheckoutPage";
import OrderConfimationPage from "./pages/cart/OrderConfimationPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/ResgisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyPageEmail from "./pages/auth/VerifyEmailPage";

import OrderHistoryPage from "./pages/account/OrderHistoryPage";
import AddressesPage from "./pages/account/AddessesPage";
import SavedItemsPage from "./pages/account/SavedItemsPage";
import AccountSettingsPage from "./pages/account/AccountSettingsPage";
import OrderDetailsPage from "./pages/account/OrderDeteailsPage";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminProductFormPage from "./pages/admin/AdminProductFormPage";
import AdminOrdersPage from "./pages/admin/AdminOrderPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

import Mainlayout from "./layouts/MainLayout";
import AccountLayout from "./layouts/AccountLayout";
import AccountOverviewPage from "./pages/account/AccountOverviewPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Everyone can access these pages */}
        <Route element={<Mainlayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Pages that need a login: shoppers who are logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/verify-email" element={<VerifyPageEmail />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route
              path="/order-confirmation/:orderId"
              element={<OrderConfimationPage />}
            />

            {/* Account pages: account menu on the left */}
            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<AccountOverviewPage />} />
              <Route path="orders" element={<OrderHistoryPage />} />
              <Route path="addresses" element={<AddressesPage />} />
              <Route path="saved" element={<SavedItemsPage />} />
              <Route path="settings" element={<AccountSettingsPage />} />
            </Route>

            <Route
              path="/account/orders/:orderId"
              element={<OrderDetailsPage />}
            />
          </Route>

          {/* Shipping, returns, FAQs, About, Terms, Privacy */}
          {/* {InforPages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<InfoPages page={page} />}
            />
          ))} */}

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin login: no layout */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin pages: only admins get in */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route
              path="products/:productId/edit"
              element={<AdminProductFormPage />}
            />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />

            {/* Any other admin address shows the 404 page inside the admin layout */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
