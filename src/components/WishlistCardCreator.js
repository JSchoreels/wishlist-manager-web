import React, {useState} from "react";
import addImage from "../assets/add-image.png";
import "./WishlistCard.scss";

export default function WishlistCardCreator(props) {
    const [cardData, setCardDate] = useState({});
    const [invalidPicture, setInvalidPicture] = useState(false);


    const updateCardName = e => setCardDate(cardData => ({...cardData, name: e.target.value}));
    const updateCategory = e => setCardDate(cardData => ({
            ...cardData,
            categories: [...e.target.selectedOptions].map(opt => opt.label)
        }
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
        <form>
            <fieldset>
                <div className={"card"} key={props.id}>
                    <input type={"text"} className={"name"} style={{width: "100%"}}
                           placeholder={"Item Name"} value={cardData.name} onChange={updateCardName} required/>
                    <select className={"category"} multiple onChange={updateCategory}>
                        {props.allCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <div className={"preview"}>
                        <label htmlFor="preview-input" onInvalid={() => alert('test2')}>
                            {cardData.picture ?
                                <img src={cardData.picture} alt="Preview" style={{opacity: "75%"}}/> :
                                <img src={addImage} alt="Upload Card Preview"/>}
                            {invalidPicture ? <span style={{color: "white", backgroundColor: "red", fontSize: '.8em'}}>Please upload a picture</span> : null}
                        </label>
                        <input id="preview-input" type="file"
                               onChange={updateCardImage} style={{display: "none"}} required
                               onInvalid={() => setInvalidPicture(true)}/>
                    </div>

                    <div className={"footer"} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        <input type="date" id="date" name="date" onChange={updateReleaseDate}/>
                        <div className={"controls"} style={{display: "flex", gap: "5px"}}>
                            <span role={"img"} aria-label={"Delete"}
                                  onClick={() => props.deleteItemCallback(props.id)}>❌</span>
                            <label htmlFor={"save-item"}>
                                <span role={"img"} aria-label={"save-item"}>✅</span>
                            </label>
                            <button id="save-item" type={"submit"} style={{display: "none"}}
                                onSubmit={() => props.saveItemCallback(props.id, cardData)}>Submit</button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}