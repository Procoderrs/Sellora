import Header from "../components/Header"
import Hero from '../components/Hero'
import ParentCategoryShowcase from "../components/CustomerProducts"
import ProductsByCats from "../components/ProductsByCats"
import Shop_info from "../components/Shop_info"
import TopCrousel from "../components/TopCrousel"
import TopProducts from "../components/TopProducts"
export default  function CustomerDashboard(){
  return(
    <>
    
    <Hero/>
    
    <TopProducts/>
    <ParentCategoryShowcase/>
    <Shop_info/>
    {/* <ProductsByCats/> */}
    </>
  )
}
