import React, {useState} from "react";
import addImage from "../assets/add-image.png";
import "./WishlistCard.scss";
import * as PropTypes from "prop-types";

function PreviewUploader(props) {
    return <div className={"preview"}>
        <label htmlFor="preview-input">
            {props.cardData.picture ?
                <img src={props.cardData.picture} alt="Preview" style={{opacity: "75%"}}/> :
                <img src={addImage} alt="Upload Card Preview"/>}
            {props.invalidPicture ? <span style={{color: "white", backgroundColor: "red", fontSize: ".8em"}}>Please upload a picture</span> : null}
        </label>
        <input id="preview-input" type="file"
               onChange={props.onChange} style={{display: "none"}} required
               onInvalid={props.onInvalid}/>
    </div>;
}

PreviewUploader.propTypes = {
    cardData: PropTypes.shape({}),
    invalidPicture: PropTypes.bool,
    onChange: PropTypes.func,
    onInvalid: PropTypes.func
};

function CardSaver(props) {
    return <>
        <label htmlFor={"save-item"}>
            <span role={"img"} aria-label={"save-item"}>✅</span>
        </label>
        <button id="save-item" type={"submit"} style={{display: "none"}} onSubmit={props.onSubmit}>Submit</button>
    </>
}

CardSaver.propTypes = {onSubmit: PropTypes.func}

function CardDeleter(props) {
    return <span role={"img"} aria-label={"Delete"}
                 onClick={props.onClick}>❌</span>;
}

CardDeleter.propTypes = {onClick: PropTypes.func};

function ReleaseDateSelector(props) {
    return <input type="date" id="date" name="date" onChange={props.onChange}/>;
}

ReleaseDateSelector.propTypes = {onChange: PropTypes.func};
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
    const saveCardData = () => props.saveItemCallback(props.id, cardData);
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
                    <PreviewUploader cardData={cardData}
                                     invalidPicture={invalidPicture}
                                     onInvalid={() => setInvalidPicture(true)}
                                     onChange={updateCardImage}/>

                    <div className={"footer"} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        <ReleaseDateSelector onChange={updateReleaseDate}/>
                        <div className={"controls"} style={{display: "flex", gap: "5px"}}>
                            <CardDeleter onClick={() => props.deleteItemCallback(props.id)}/>
                            <CardSaver onSubmit={saveCardData}/>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}