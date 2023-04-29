import React, {memo, useCallback, useState} from "react";
import addImage from "../assets/add-image.png";
import "./WishlistCard.scss";
import * as PropTypes from "prop-types";

const PreviewUploader = memo(function PreviewUploader(props) {
    return <div className={"preview"}>
        <label htmlFor="preview-input">
            {props.picture ?
                <img src={props.picture} alt="Preview" style={{opacity: "75%"}}/> :
                <img src={addImage} alt="Upload Card Preview"/>}
            {props.invalidPicture ? <span style={{color: "white", backgroundColor: "red", fontSize: ".8em"}}>Please upload a picture</span> : null}
        </label>
        <input id="preview-input" type="file"
               onChange={props.onChange} style={{display: "none"}} required
               onInvalid={() => props.setInvalid(true)}/>
    </div>;
});

PreviewUploader.propTypes = {
    cardData: PropTypes.shape({}),
    invalidPicture: PropTypes.bool,
    onChange: PropTypes.func,
    onInvalid: PropTypes.func
};

const CardSaver = memo(function CardSaver() {
    return <>
        <label htmlFor={"save-item"}>
            <span role={"img"} aria-label={"save-item"}>✅</span>
        </label>
        <button id="save-item" type={"submit"} style={{display: "none"}}>Submit</button>
    </>
});

CardSaver.propTypes = {onSubmit: PropTypes.func}

const CardDeleter = memo(function CardDeleter(props) {
    return <span role={"img"} aria-label={"Delete"}
                 onClick={props.onClick}>❌</span>;
})

CardDeleter.propTypes = {onClick: PropTypes.func};

function ReleaseDateSelector(props) {
    return <input type="date" id="date" name="date" onChange={props.onChange}/>;
}

ReleaseDateSelector.propTypes = {onChange: PropTypes.func};

function CardNameEditor(props) {
    return <input type={"text"} className={"name"} style={{width: "100%"}}
                  placeholder={"Item Name"} value={props.cardData.name} onChange={props.onChange} required/>;
}

CardNameEditor.propTypes = {
    cardData: PropTypes.shape({name: PropTypes.string, categories: PropTypes.arrayOf(PropTypes.any)}),
    onChange: PropTypes.func
};

function CardCategorySelector(props) {
    return <>
        <select className={"category"} multiple onChange={props.onChange}>
            {props.allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
    </>;
}

CardCategorySelector.propTypes = {
    cardData: PropTypes.shape({name: PropTypes.string, categories: PropTypes.arrayOf(PropTypes.any)}),
    onChange: PropTypes.func
};
export default function WishlistCardCreator(props) {
    const [cardData, setCardData] = useState({
        name: '',
        categories: [],
    });
    const [invalidPicture, setInvalidPicture] = useState(false);


    const updateCardName = e => setCardData(cardData => ({...cardData, name: e.target.value}));
    const updateCategory = e => setCardData(cardData => ({
            ...cardData,
            categories: [...e.target.selectedOptions].map(opt => opt.label)
        }
    ));
    const updateReleaseDate = e => setCardData(cardData => ({...cardData, releaseDate: e.target.value}));

    const updateCardImage = useCallback((event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setCardData(cardData => ({...cardData, picture: reader.result}));
        };
        reader.readAsDataURL(file);
    }, []);
    const saveCardData = () => props.saveItemCallback(props.id, cardData);
    const deleteCard = useCallback(() => props.deleteItemCallback(props.id), [props.deleteItemCallback, props.id])
    return (
        <form onSubmit={saveCardData}>
            <fieldset>
                <div className={"card"} key={props.id}>
                    <CardNameEditor cardData={cardData} onChange={updateCardName}/>
                    <CardCategorySelector cardData={cardData} onChange={updateCategory}
                                          allCategories={props.allCategories}/>
                    <PreviewUploader picture={cardData.picture}
                                     invalidPicture={invalidPicture}
                                     setInvalid={setInvalidPicture}
                                     onChange={updateCardImage}/>

                    <div className={"footer"} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        <ReleaseDateSelector onChange={updateReleaseDate}/>
                        <div className={"controls"} style={{display: "flex", gap: "5px"}}>
                            <CardDeleter onClick={deleteCard}/>
                            <CardSaver/>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}