import React, {useCallback, useState} from 'react';
import dummydata from "../data/dummydata.json"
import WishlistCard from "./WishlistCard";
import "./WishlistManager.scss";
import {getItemsToShow} from "./DataFilter";
import WishlistCardCreator from "./WishlistCardCreator";
import { v4 as uuidv4 } from 'uuid';

export function parseDate(dateString) {
    if (dateString == null) {
        return null;
    } else {
        const inputMonth = dateString.split("-")[1];
        const inputDay = dateString.split("-")[2];
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return null;
        }
        if (!inputMonth) {
            date.setFullYear(date.getFullYear() + 1);
            date.setDate(date.getDate() - 1);
        } else if (!inputDay) {
            date.setMonth(date.getMonth() + 1);
            date.setDate(date.getDate() - 1);
        }
        return date;
    }
}

export const sortingByCriteria = (criteria, criteriaType, reversed) => {
    const sortingBy = (a, b) => {
        let aValue = a[criteria];
        let bValue = b[criteria];
        if (criteriaType === "Date") {
            aValue = parseDate(aValue);
            bValue = parseDate(bValue);
        }
        if (aValue == null) {
            return 1;
        } else if (bValue == null) {
            return -1;
        } else if (aValue < bValue) {
            return -1;
        } else if (aValue > bValue) {
            return 1;
        } else {
            return 0;
        }
    };

    return (a, b) => (reversed ? -1 : 1) * sortingBy(a, b);
}

function WishlistManager(props) {
    const combinationModes = ["OR", "AND", "AND_FIRST"];
    const defaultCombinationMode = "OR";
    const defaultOnlyOwned = false;
    const sortingCriterias = {
        "id": {"Label": "Custom"},
        "releaseDate": {"Label": "Release Date", type: "Date"},
        "addedDate": {"Label": "Added Date", type: "Date"},
        "name": {"Label": "Name"}
    };
    const defaultSortingCriteria = 'releaseDate';
    const defaultReversedOrder = true;

    const [data, setData] = useState(dummydata);
    const allCategories = [...new Set(data.items.flatMap(item => item.categories))];
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [combinationMode, setCombinationMode] = useState(defaultCombinationMode);
    const [onlyOwned, setOnlyOwned] = useState(defaultOnlyOwned);
    const [sortingCriteria, setSortingCriteria] = useState(defaultSortingCriteria);
    const [reversedOrder, setReversedOrder] = useState(defaultReversedOrder);

    const toggleCategory = event => {
        if (event.target.checked) {
            return setSelectedCategories(selectedCategories => selectedCategories.concat(event.target.name))
        } else {
            return setSelectedCategories(selectedCategories => selectedCategories.filter(cat => cat !== event.target.name))
        }
    }

    const toggleCombinationMode = event => {
        return setCombinationMode(event.target.name)
    }

    function toggleSortingCriteria(event) {
        setSortingCriteria(event.target.value);
    }

    function resetSelections() {
        setSelectedCategories([]);
        setCombinationMode(defaultCombinationMode);
        setOnlyOwned(defaultOnlyOwned);
        setSortingCriteria(defaultSortingCriteria);
        setReversedOrder(defaultReversedOrder)
    }

    const itemsToShow = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);


    itemsToShow.baseItems.sort(sortingByCriteria(sortingCriteria, sortingCriterias[sortingCriteria].type, reversedOrder));
    itemsToShow.extraItems.sort(sortingByCriteria(sortingCriteria, sortingCriterias[sortingCriteria].type, reversedOrder));

    const deleteItemCallback = useCallback((id) => {
        setData( data => ({
            ...data,
            items: data.items.filter(item => item.id !== id)
        }))
    }, [data]);

    const saveItemCallback = (key, cardData) => {
        setData(
            data => ({
                ...data,
                items: [...data.items, cardData]
                })
        )
    }

    const new_id = uuidv4();
    return (
        <div>
            <header>
                <h1>Wishlist Manager</h1>
            </header>
            <form>
                <fieldset style={{display: "flex", justifyContent: "left", gap: "25px"}}>
                    <legend>Choose a category you want to show</legend>
                    {
                        allCategories.map(cat => (
                            <div key={cat}>
                                <input type="checkbox" id={cat} name={cat} checked={selectedCategories.includes(cat)}
                                       onChange={toggleCategory}/>
                                <label htmlFor={cat}>{cat}</label>
                            </div>
                        ))
                    }
                </fieldset>
                <fieldset style={{display: "flex", justifyContent: "left", gap: "25px"}}>
                    <legend>Choose the combination mode (AND_FIRST will do first an "AND" and add "OR" after)</legend>
                    {
                        combinationModes.map(mode => (
                            <div key={mode}>
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
                <fieldset style={{display: "flex", justifyContent: "left", gap: "10px", order: '2'}}>
                    <legend>Sorting Order</legend>
                    <select id="sortSelection" name="sortSelection" onChange={toggleSortingCriteria}
                            defaultValue={defaultSortingCriteria}>
                        {
                            Object.keys(sortingCriterias).map(criteria => (
                                <option key={criteria} value={criteria}>{sortingCriterias[criteria].Label}</option>
                            ))
                        }
                    </select>
                    <div>
                        <input type="checkbox" id="reversedOrder" name="reversedOrder" checked={reversedOrder}
                               onChange={event => setReversedOrder(reversedOrder => !reversedOrder)}/>
                        <label htmlFor="onlyOwned">reversed</label>
                    </div>
                </fieldset>

                <button id={"resetSelection"} onClick={() => resetSelections()}>Reset</button>
            </form>
            <h2>Items</h2>
            <div className={"itemsgrid"}>
                <WishlistCardCreator key={new_id} id={new_id} allCategories={allCategories}
                                     deleteItemCallback={deleteItemCallback}
                                     saveItemCallback={saveItemCallback}/>
                    {itemsToShow['baseItems'].map(item => <WishlistCard key={item.id}
                                                                    deleteItemCallback={deleteItemCallback}
                                                                    data={item}/>)}
                {itemsToShow['extraItems'].map(item => <WishlistCard key={item.id}
                                                                     deleteItemCallback={deleteItemCallback}
                                                                     data={item} extra/>)}
            </div>
            <a href="https://www.flaticon.com/free-icons/frame" title="frame icons">Frame icons created by Alfredo
                Hernandez - Flaticon</a>
        </div>
    );
}

export default WishlistManager;