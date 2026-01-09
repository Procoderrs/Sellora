import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {Outlet} from 'react-router-dom'

export default function AdminLayout(){
  return(

    
    <>
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
<Topbar/>
<main className="flex-1 overflow-auto bg-gray-100">
<Outlet/>
</main>
      </div>

    </div>
    </>
  )
}