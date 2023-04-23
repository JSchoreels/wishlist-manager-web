import React, {useState} from "react";
import addImage from "../assets/add-image.png";
import "./WishlistCard.scss";

export default function WishlistCardCreator(props) {
    const [cardData, setCardDate] = useState({});



    const updateCardName = e => setCardDate(cardData => ({...cardData, name: e.target.value}));
    const updateCategory = e => setCardDate(cardData => ({
        ...cardData,
        categories: [...e.target.selectedOptions].map(opt => opt.label)}
    ));
    const updateReleaseDate = e => setCardDate(cardData => ({...cardData, releaseDate: e.target.value}));

    const updateCardImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setCardDate(cardData => ({...cardData, picture: reader.result}));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={"card"} key={props.key}>
            <input type={"text"} className={"name"} style={{width: "100%"}}
                   placeholder={"Item Name"} value={cardData.name} onChange={updateCardName}/>
            <select className={"category"} multiple onChange={updateCategory}>
                {props.allCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <div className={"preview"}>
                <label htmlFor="preview-input">
                    {cardData.picture ?
                        <img src={cardData.picture} alt="Preview" style={{opacity: "75%"}}/> :
                        <img src={addImage} alt="Upload Card Preview"/>}
                </label>
                <input id="preview-input" type="file" onChange={updateCardImage} style={{display: "none"}}/>
            </div>

            <div className={"footer"} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <input type="date" id="date" name="date" onChange={updateReleaseDate}/>
                <div className={"controls"} style={{display: "flex", gap: "5px"}}>
                    <span role={"img"} aria-label={"Delete"}
                          onClick={() => props.deleteItemCallback(props.id)}>❌</span>
                    <span role={"img"} aria-label={"Save"}
                          onClick={() => props.saveItemCallback(props.id, cardData)}>✅</span>
                </div>
            </div>
        </div>
    );
}