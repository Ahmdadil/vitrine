import React, { useState, useContext } from 'react'
import { AuthContext, CategoriesContext, FirebaseContext, ProductsContext } from "../store/Context";



import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import AddProduct from './AddProduct'
import Header from './Header';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import EditProduct from './EditProduct';
import ShopInfo from './ShopInfo';




function Admin() {

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [showEditCategory, setShowEditCategory] = useState(false)
    const [showEditProduct, setShowEditProduct] = useState(false)


    const [productCategoryId, setProductCategoryId] = useState('')
    const [productCategoryName, setProductCategoryName] = useState('')

    const [editProduct, setEditProduct] = useState(null)

    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(AuthContext)
    const { categories } = useContext(CategoriesContext)
    const { products } = useContext(ProductsContext)
    

    let productSerial = 1000;
    let categorySerial = 100;
    var collectionName = "";

    const handleDelete = (Id, collectionName, productName) => {

        //Delete products with same category if function called to delete a category
        if (collectionName == 'product_categories') {
            products.map(product => {
                if (Id == product.categoryId)
                    firebase.firestore().collection('products').doc(product.id).delete();
            })
        }

        //Delete photos from storage if function called to delete a product
        if (collectionName == 'products') {
            //console.log(collectionName);
            firebase.storage().ref(`/image/${productName}`).listAll().then((listResults) => {
                const promises = listResults.items.map((item) => {
                    return item.delete();
                });
                Promise.all(promises);
            });

        }

        if (Id) {
            firebase.firestore().collection(collectionName).doc(Id).delete().then(() => {
                alert('Item deleted');
                location.reload();
            }).catch((error) => {
                alert("error while removing Item : ", error);
            })
        }


    }

    return (
        <>
            <Header />
            {user ?
                <div>

                    <div className='mx-auto sm:w-8/12 md:w-9/12 lg:w-7/12'>

                        {/*-------------------- CATEGORY  SECTION --------------------------*/}

                        <div className='justify-center flex py-3'>
                            <Button variant="outline" className='py-2 w-32 border-2 rounded-full border-red-800 hover:bg-red-800 hover:text-white' onClick={() => setShowAddCategory(true)} >Add Category</Button>
                        </div>
                        {showAddCategory && <AddCategory closeModal={() => setShowAddCategory(false)} />}
                        <div className="overflow-auto max-h-96 md:max-h-screen mx-5 lg:mx-0 ">
                            <Table className="border-2 border-gray-400">
                                <TableCaption className="my-2">List of Product Categories</TableCaption>
                                <TableHeader className="border-b-2 border-gray-400 ">
                                    <TableRow>
                                        <TableHead className="w-[100px]">Sl.No:</TableHead>
                                        <TableHead className="text-center">Category</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Delete</TableHead>
                                        <TableHead className="text-center"> Add Products</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map(category => {

                                        categorySerial++;

                                        return (

                                            <TableRow key={category.id}>
                                                <TableCell className="font-medium text-left">CTG{categorySerial}</TableCell>
                                                <TableCell className="text-center">{category.category}</TableCell>
                                                <TableCell className="text-left">
                                                    <button onClick={() => { setShowEditCategory(true); setProductCategoryId(category.id); setProductCategoryName(category.category) }} >
                                                        <img alt='Edit' className='w-6 lg:w-8 h-auto' src='src/assets/edit.png'></img>
                                                    </button>
                                                </TableCell>
                                                <TableCell className="text-left">
                                                    <button onClick={() => { handleDelete(category.id, collectionName = "product_categories", ''); }}>
                                                        <img alt='Delete' className='w-7 lg:w-10 h-auto' src='src/assets/delete.png'></img>
                                                    </button>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <button
                                                        className='border border-cyan-600 hover:bg-cyan-600 hover:text-white w-32 p-2 rounded-full'
                                                        onClick={() => { setShowAddProduct(true); setProductCategoryId(category.id); setProductCategoryName(category.category) }}
                                                    >Add Products
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        )

                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        {showEditCategory && <EditCategory closeModal={() => setShowEditCategory(false)} categoryId={productCategoryId} categoryName={productCategoryName} />}
                        {showAddProduct && <AddProduct closeModal={() => setShowAddProduct(false)} categoryId={productCategoryId} categoryName={productCategoryName} />}


                        {/*-------------------- PRODUCTS  SECTION --------------------------*/}


                        <div className="overflow-auto max-h-96 md:max-h-screen my-8 mx-5 lg:mx-0">
                            <Table className="border-2 border-gray-400">
                                <TableCaption className="my-2">List of your Products</TableCaption>
                                <TableHeader className="border-b-2 border-gray-400 ">
                                    <TableRow>
                                        <TableHead className="w-[100px]">Sl.No:</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead className="text-center">Product</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Mrp</TableHead>
                                        <TableHead>Priceee</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map(product => {

                                        productSerial++;

                                        return (

                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium text-left">PRD{productSerial}</TableCell>
                                                <TableCell className="text-left"><img className='w-10 lg:w-20 h-auto' src={product.url}></img></TableCell>
                                                <TableCell className="text-center"><p className='w-32'>{product.productName}</p></TableCell>
                                                <TableCell className="text-left">{product.categoryName}</TableCell>
                                                <TableCell className="text-left">₹{product.mrp}</TableCell>
                                                <TableCell className="text-left">₹{product.price}</TableCell>
                                                <TableCell className="text-left">
                                                    <button onClick={() => { setShowEditProduct(true); setEditProduct(product) }}>
                                                        <img alt='Edit' className='w-8 lg:w-8 h-auto' src='src/assets/edit.png'></img>
                                                    </button>
                                                </TableCell>
                                                <TableCell className="text-left">
                                                    <button onClick={() => { handleDelete(product.id, collectionName = "products", product.productName); }}>
                                                        <img alt='Delete' className='w-8 lg:w-10 h-auto' src='src/assets/delete.png'></img>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        )

                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        {showEditProduct && <EditProduct open ={showEditProduct} closeModal={() => setShowEditProduct(false)} product={editProduct} />}

                    </div>

                    {/*-------------------- ABOUT  SECTION --------------------------*/}

                    <ShopInfo />
                </div> :
                <div className='mx-auto sm:w-7/12 md:w-7/12 lg:w-full lg:h-full opacity-25'>
                    <h1 className='text-8xl text my-96 font-bold font-'>Please Login....</h1>
                </div>
            }
        </>
    )
}

export default Admin