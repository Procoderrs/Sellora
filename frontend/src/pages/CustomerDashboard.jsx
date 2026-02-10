import Header from "../components/Header"
import Hero from '../components/Hero'
import ParentCategoryShowcase from "../components/CustomerProducts"
import ProductsByCats from "../components/ProductsByCats"
import Shop_info from "../components/Shop_info"
export default  function CustomerDashboard(){
  return(
    <>
    
    <Hero/>
    <Shop_info/>
    <ParentCategoryShowcase/>
    {/* <ProductsByCats/> */}
    </>
  )
}
