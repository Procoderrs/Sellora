import Header from "../components/Header"
import Hero from '../components/Hero'
import ParentCategoryShowcase from "../components/CustomerProducts"
import ProductsByCats from "../components/ProductsByCats"
import Shop_info from "../components/Shop_info"
import TopCrousel from "../components/TopCrousel"
import TopProducts from "../components/TopProducts"
import Info from "../components/Info"
import Variety from "../components/Varietyy"
export default  function CustomerDashboard(){
  return(
    <>
    
    <Hero/>
    <Info/>
        <Variety/>

    <TopProducts/>
    <ParentCategoryShowcase/>
    <Shop_info/>
    {/* <ProductsByCats/> */}
    </>
  )
}
