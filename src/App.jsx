import { useEffect, useContext } from 'react'
import { Route, Routes } from "react-router-dom";

import './App.css'

//Components
import About from './Pages/About';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Admin from './Pages/Admin';
import Footer from './components/Footer';
import FloatIcon from './components/FloatIcon';

import { ThemeProvider } from "@/components/theme-provider"
import { AuthContext, CategoriesContext, FirebaseContext, ProductsContext, ShopInfoContext } from './store/Context';


function App() {

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const { setProducts } = useContext(ProductsContext)
  const { setCategories } = useContext(CategoriesContext)
  const { setShopsInfos } = useContext(ShopInfoContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
      
    })


    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      //console.log(allPost);
      setProducts(allPost);
    })


    firebase.firestore().collection('product_categories').get().then((snapshot) => {
      const allCategories = snapshot.docs.map((category) => {
        return {
          ...category.data(),
          id: category.id
        }
      })
      //console.log(allCategories);
      setCategories(allCategories);
      
    })


    firebase.firestore().collection('shop_info').get().then((snapshot) => {
      const ShopsInfos = snapshot.docs.map((shopInfo) => {
        return {
          ...shopInfo.data(),
          id: shopInfo.id
        }
      })
      //console.log(ShopsInfos);
      setShopsInfos(ShopsInfos);
    })


  }, [])

  return (
    <div className='body'>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminPage" element={<Admin />} />
        </Routes>
        <FloatIcon />
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App
