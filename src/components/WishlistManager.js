import React, {useState} from 'react';
import data from "../data/dummydata.json"
import WishlistCard from "./WishlistCard";
import "./WishlistManager.scss";
import {arraysEqual} from "../utils";

function WishlistManager(props) {
    const allCategories = [...new Set(data.items.flatMap(item => item.categories))];
    const combinationModes = ["OR", "AND", "AND_FIRST"];

    const [selectedCategories, setSelectedCategories] = useState(allCategories);
    const [combinationMode, setCombinationMode] = useState("OR");
    const [onlyOwned, setOnlyOwned] = useState(false);

    const toggleCategory = event => {
        if (event.target.checked) {
            return setSelectedCategories(selectedCategories => selectedCategories.concat(event.target.name))
        } else {
            return setSelectedCategories(selectedCategories => selectedCategories.filter(cat => cat !== event.target.name))
        }
    }

    const toggleCombinationMode = event => {
        if (combinationMode === "OR" && selectedCategories.length === allCategories.length) {
            setSelectedCategories([]);
        } else if (combinationMode === "AND" && selectedCategories.length === 0) {
            setSelectedCategories(allCategories);
        }
        return setCombinationMode(event.target.name)
    }

    const filterItemsOnCategories = (items) => {
        const itemsMatchingAllCategories = items.filter(item => selectedCategories.every(cat => item.categories.includes(cat)));
        const itemsMatchingSomeCategories = items.filter(item => selectedCategories.some(cat => item.categories.includes(cat)));
        const baseItems = ["AND", "AND_FIRST"].includes(combinationMode) ?
            itemsMatchingAllCategories :
            itemsMatchingSomeCategories;
        const extraItems = ["AND_FIRST"].includes(combinationMode)
          ? itemsMatchingSomeCategories
              .filter(item => !itemsMatchingAllCategories.includes(item))
              .map(item => ({ ...item, extra: true }))
          : [];
        return {baseItems, extraItems};
    }


    let itemsToShow = data.items;
    if (onlyOwned) {
        itemsToShow = itemsToShow.filter(item => item.owned);
    }
    itemsToShow = filterItemsOnCategories(itemsToShow);

    function resetSelections() {
        setSelectedCategories(allCategories);
        setCombinationMode("OR");
    }

    return (
        <div>
            <header>
                <h1>Wishlist Manager</h1>
            </header>
            <h2>Categories</h2>
            <form>
                <fieldset style={{display: "flex", justifyContent: "left", gap: "25px", order: '1'}}>
                    <legend>Choose category you want to show</legend>
                    {
                        allCategories.map(cat => (
                            <div>
                                <input type="checkbox" id={cat} name={cat} checked={selectedCategories.includes(cat)}
                                       onChange={toggleCategory}/>
                                <label htmlFor={cat}>{cat}</label>
                            </div>
                        ))
                    }
                </fieldset>
                <fieldset style={{display: "flex", justifyContent: "left", gap: "25px", order: '2'}}>
                    <legend>Choose the combination mode you prefer</legend>
                    {
                        combinationModes.map(mode => (
                            <div>
                                <input type="radio" id={mode} name={mode} checked={mode === combinationMode}
                                       onChange={toggleCombinationMode}/>
                                <label htmlFor={mode}>{mode}</label>
                            </div>
                        ))
                    }
                </fieldset>
                <fieldset style={{display: "flex", justifyContent: "left", gap: "25px", order: '2'}}>
                    <legend>Additional Filters</legend>
                    <div>
                        <input type="checkbox" id="onlyOwned" name="onlyOwned" checked={onlyOwned}
                               onChange={event => setOnlyOwned(onlyOwned => !onlyOwned)}/>
                        <label htmlFor="onlyOwned">Only Owned Items.</label>
                    </div>
                </fieldset>
                <button style={{order: '3'}} onClick={() => resetSelections()}>Reset</button>
            </form>
            <h2>Items</h2>
            <div className={"itemsgrid"}>
                {itemsToShow['baseItems'].map(item => <WishlistCard data={item}/>)}
                {itemsToShow['extraItems'].map(item => <WishlistCard data={item} extra/>)}
            </div>
        </div>

    );
}

export default WishlistManager;