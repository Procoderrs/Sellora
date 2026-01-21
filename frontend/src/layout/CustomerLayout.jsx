import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from '../components/Header'
import Footer from "../components/Footer"
export default function CustomerLayout(){
  return(
    <>
   
      {/* Shared Header */}
      <Header />

      {/* Page Content */}
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <Footer />
    </>
  
  )
}