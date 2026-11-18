import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/layout/ScrollToTop";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AddedToCartModal from "../components/product/AddedToCartModal";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AddedToCartModal />
    </>
  );
};

export default MainLayout;
