import { Outlet } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import Subscribe from '../components/Subscribe'

export default function PublicLayout() {
  return (
    <>
      <PublicHeader />

      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      
    <Subscribe/>
      <Footer />
    </>
  );
}
