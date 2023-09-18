import { useState, createContext } from "react";




export const FirebaseContext = createContext(null)
export const AuthContext = createContext(null)
export const ProductsContext = createContext(null)
export const CategoriesContext = createContext(null)
export const ShopInfoContext = createContext(null)


export default function Context({ children }) {

    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [shopsInfos, setShopsInfos] = useState([])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <ProductsContext.Provider value={{ products, setProducts }}>
                <CategoriesContext.Provider value={{ categories, setCategories }}>
                    <ShopInfoContext.Provider value={{ shopsInfos, setShopsInfos }}>
                        {children}
                    </ShopInfoContext.Provider>
                </CategoriesContext.Provider>
            </ProductsContext.Provider>
        </AuthContext.Provider>
    )
}