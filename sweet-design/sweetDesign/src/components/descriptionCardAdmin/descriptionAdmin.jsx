import React, { useState, useEffect } from "react";
import "./styleDescriptionAdmin.css";
import Popup from "../popUp/pop.jsx";
import axios from "axios";
import { parseJwt } from "../../utils/authService.jsx";

const AdminDescriptionCard = ({
                                  image,
                                  price,
                                  name,
                                  ingredients,
                                  description,
                                  allergy,
                                  productId,
                                  type,
                                  onDeleteProduct
                              }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [editedName, setEditedName] = useState(name);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedType, setEditedType] = useState(type);
    const [editedIngredients, setEditedIngredients] = useState(ingredients);
    const [editedAllergy, setEditedAllergy] = useState(allergy);
    const [editedPrice, setEditedPrice] = useState(price);

    useEffect(() => {
        setEditedName(name);
        setEditedDescription(description);
        setEditedType(type);
        setEditedIngredients(ingredients);
        setEditedAllergy(allergy);
        setEditedPrice(price);
    }, [name, description, type, ingredients, allergy, price]);

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleEditProduct = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        // Aici poți adăuga logica de salvare (API)
    };

    const handleCancelEdit = () => {
        setEditedName(name);
        setEditedDescription(description);
        setEditedType(type);
        setEditedIngredients(ingredients);
        setEditedAllergy(allergy);
        setEditedPrice(price);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (onDeleteProduct && productId) {
            onDeleteProduct(productId);
        }
    };

    return (
        <div className="admin-description-card-container">
            <div className="admin-description-card-image-background">
                <img src={image} alt={editedName} className="admin-description-card-product-image" />
                {!isEditing && (
                    <>
                        <button
                            className="admin-description-card-edit-btn"
                            onClick={handleEditProduct}
                        >
                            Edit Product
                        </button>
                        <button
                            className="admin-description-card-delete-btn"
                            onClick={handleDelete}
                        >
                            Delete Product
                        </button>
                    </>
                )}
            </div>
            <div className="admin-description-card-details-section">
                {!isEditing ? (
                    <>
                        <h2>{editedName}</h2>
                        <p>{editedDescription || "No description available."}</p>
                        <h4>Type:</h4>
                        <p>{editedType || "No type specified."}</p>
                        <h4>Ingredients:</h4>
                        <p>{editedIngredients || "No ingredients listed."}</p>
                        <h4>Allergy Information:</h4>
                        <p>{editedAllergy || "No allergy information available."}</p>
                        <h4>Pricing: {editedPrice || "N/A"}</h4>
                    </>
                ) : (
                    <div className="admin-edit-form">
                        <h2>Edit Product</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            Type (stock, preorder, mix):
                            <select
                                value={editedType}
                                onChange={(e) => setEditedType(e.target.value)}
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
                                value={editedIngredients}
                                onChange={(e) => setEditedIngredients(e.target.value)}
                            />
                        </label>
                        <label>
                            Allergy Information:
                            <input
                                type="text"
                                value={editedAllergy}
                                onChange={(e) => setEditedAllergy(e.target.value)}
                            />
                        </label>
                        <label>
                            Pricing:
                            <input
                                type="text"
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(e.target.value)}
                            />
                        </label>
                        <div className="admin-edit-form-buttons">
                            <button onClick={handleSaveChanges}>Save Changes</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
            <Popup isVisible={isPopupVisible} onClose={handleClosePopup} message={popupMessage} />
        </div>
    );
};

export default AdminDescriptionCard;
