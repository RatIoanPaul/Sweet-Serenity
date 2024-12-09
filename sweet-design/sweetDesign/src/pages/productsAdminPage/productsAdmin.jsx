import React, { useState } from 'react';
import './styleProductsAdmin.css';
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import Navbar from "../../components/navbar/index.jsx";
import ProductCardAdmin from "../../components/productCardAdmin/cardAdmin.jsx";
import AdminDescriptionCard from "../../components/descriptionCardAdmin/descriptionAdmin.jsx";

const initialProducts = [
    { id: 1, name: 'Red Velvet Cupcake', imgSrc: cupcakeImage, price: '$5', ingredients: 'Cocoa, Sugar, Butter', description: 'Moist red velvet cupcakes with cream cheese frosting', isArchived: false, type: 'stock' },
    { id: 2, name: 'Chocolate Cupcake', imgSrc: cupcakeImage, price: '$6', ingredients: 'Chocolate, Sugar, Flour', description: 'Rich chocolate cupcakes with a smooth texture', isArchived: false, type: 'preorder' },
    { id: 3, name: 'Chocolate Cookie', imgSrc: cookieImage, price: '$3', ingredients: 'Butter, Sugar', description: 'Chewy chocolate cookies with a gooey center', isArchived: true, type: 'mix' },
    { id: 4, name: 'Oatmeal Cookie', imgSrc: cookieImage, price: '$4', ingredients: 'Oats, Butter, Sugar', description: 'Hearty oatmeal cookies with a soft crunch', isArchived: false, type: 'stock' },
    { id: 5, name: 'Candy', imgSrc: sweetsImage, price: '$2', ingredients: 'Sugar, Syrup, Flavoring', description: 'Sweet, colorful candies', isArchived: false, type: 'preorder' },
    { id: 6, name: 'Lollipop', imgSrc: sweetsImage, price: '$3', ingredients: 'Sugar, Flavoring, Color', description: 'Tasty lollipops in various flavors', isArchived: false, type: 'mix' },
    { id: 7, name: 'Chocolate Cake', imgSrc: cakeImage, price: '$10', ingredients: 'Flour, Sugar, Cocoa, Butter', description: 'Delicious chocolate cake with creamy frosting', isArchived: true, type: 'stock' },
    { id: 8, name: 'Vanilla Cake', imgSrc: cakeImage, price: '$12', ingredients: 'Flour, Sugar, Butter, Vanilla', description: 'Moist vanilla cake with a sweet frosting', isArchived: true, type: 'preorder' },
];

const Products = () => {
    const [products, setProducts] = useState(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewArchived, setViewArchived] = useState(false);

    const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
    const [selectedTab, setSelectedTab] = useState('active');

    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newType, setNewType] = useState('stock');
    const [newIngredients, setNewIngredients] = useState('');
    const [newAllergy, setNewAllergy] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newImageFile, setNewImageFile] = useState(null);
    const [newImagePreview, setNewImagePreview] = useState(null);
    const [newIsArchived, setNewIsArchived] = useState(false);

    const handleViewArchivedToggle = (isArchivedView) => {
        setViewArchived(isArchivedView);
        setSelectedProduct(null);
        setIsAddingNewProduct(false);

        if (isArchivedView) {
            setSelectedTab('archived');
        } else {
            setSelectedTab('active');
        }
    };

    const toggleProductStatus = (id) => {
        const updatedProducts = products.map((product) => {
            if (product.id === id) {
                return { ...product, isArchived: !product.isArchived };
            }
            return product;
        });

        const movedProduct = updatedProducts.find((product) => product.id === id);
        const remainingProducts = updatedProducts.filter((product) => product.id !== id);

        const newProductsList = [
            ...remainingProducts.filter(product => product.isArchived === movedProduct.isArchived),
            movedProduct,
            ...remainingProducts.filter(product => product.isArchived !== movedProduct.isArchived)
        ];

        setProducts(newProductsList);
        setSelectedProduct(null);
    };

    const filteredProducts = products.filter((product) => product.isArchived === viewArchived);

    const handleAddNewProduct = () => {
        setIsAddingNewProduct(true);
        setViewArchived(false);
        setSelectedProduct(null);
        setSelectedTab('addProduct');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setNewImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveNewProduct = () => {
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

        const newProduct = {
            id: newId,
            name: newName,
            description: newDescription,
            type: newType,
            ingredients: newIngredients,
            imgSrc: newImagePreview || cupcakeImage,
            price: newPrice,
            isArchived: newIsArchived,
        };

        setProducts([...products, newProduct]);
        setIsAddingNewProduct(false);
        setSelectedTab(newIsArchived ? 'archived' : 'active');
        setViewArchived(newIsArchived);

        setNewName('');
        setNewDescription('');
        setNewType('stock');
        setNewIngredients('');
        setNewAllergy('');
        setNewPrice('');
        setNewImageFile(null);
        setNewImagePreview(null);
        setNewIsArchived(false);
    };

    const handleCancelNewProduct = () => {
        setIsAddingNewProduct(false);
        setSelectedTab(viewArchived ? 'archived' : 'active');

        setNewName('');
        setNewDescription('');
        setNewType('stock');
        setNewIngredients('');
        setNewAllergy('');
        setNewPrice('');
        setNewImageFile(null);
        setNewImagePreview(null);
        setNewIsArchived(false);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
        setSelectedProduct(null);
    };

    return (
        <>
            <Navbar />
            <div className="active-archive">
                <button
                    className={`archive-button ${selectedTab === 'active' ? 'active' : ''}`}
                    onClick={() => handleViewArchivedToggle(false)}
                >
                    Active Products
                </button>
                <button
                    className={`archive-button ${selectedTab === 'archived' ? 'active' : ''}`}
                    onClick={() => handleViewArchivedToggle(true)}
                >
                    Archived Products
                </button>
                <button
                    className={`add-product-button ${selectedTab === 'addProduct' ? 'active' : ''}`}
                    onClick={handleAddNewProduct}
                >
                    Add New Product
                </button>
            </div>

            <div className="admin-layout">
                {!selectedProduct && !isAddingNewProduct && (
                    <div className="admin-product-grid">
                        {filteredProducts.map((product) => (
                            <ProductCardAdmin
                                key={product.id}
                                image={product.imgSrc}
                                price={product.price}
                                name={product.name}
                                ingredients={product.ingredients}
                                isArchived={product.isArchived}
                                onToggleStatus={() => toggleProductStatus(product.id)}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                )}

                {selectedProduct && !isAddingNewProduct && (
                    <AdminDescriptionCard
                        image={selectedProduct.imgSrc}
                        price={selectedProduct.price}
                        name={selectedProduct.name}
                        ingredients={selectedProduct.ingredients}
                        description={selectedProduct.description}
                        allergy={selectedProduct.allergy || "Contains gluten and dairy"}
                        productId={selectedProduct.id}
                        type={selectedProduct.type}
                        onDeleteProduct={handleDeleteProduct}
                    />
                )}

                {isAddingNewProduct && (
                    <div className="admin-add-form">
                        <h2>Add a New Product</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            Type (stock, preorder, mix):
                            <select
                                value={newType}
                                onChange={(e) => setNewType(e.target.value)}
                            >
                                <option value="stock">stock</option>
                                <option value="preorder">preorder</option>
                                <option value="mix">mix</option>
                            </select>
                        </label>
                        <label>
                            Ingredients:
                            <input
                                type="text"
                                value={newIngredients}
                                onChange={(e) => setNewIngredients(e.target.value)}
                            />
                        </label>
                        <label>
                            Allergy Information:
                            <input
                                type="text"
                                value={newAllergy}
                                onChange={(e) => setNewAllergy(e.target.value)}
                            />
                        </label>
                        <label>
                            Pricing:
                            <input
                                type="text"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                        </label>
                        <label>
                            Image:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                        {newImagePreview && (
                            <div className="image-preview">
                                <img src={newImagePreview} alt="Preview" width="100" />
                            </div>
                        )}
                        <label>
                            Status:
                            <select
                                value={newIsArchived ? 'archived' : 'active'}
                                onChange={(e) => setNewIsArchived(e.target.value === 'archived')}
                            >
                                <option value="active">Active</option>
                                <option value="archived">Archived</option>
                            </select>
                        </label>
                        <div className="admin-add-form-buttons">
                            <button onClick={handleSaveNewProduct}>Save Product</button>
                            <button onClick={handleCancelNewProduct}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Products;
