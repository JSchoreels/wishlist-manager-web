export function getItemsToShow(data, selectedCategories, combinationMode, onlyOwned) {
    const filterItemsOnCategories = (items) => {
        const itemsMatchingAllCategories = items.baseItems.filter(item => selectedCategories.every(cat => item.categories.includes(cat)));
        const itemsMatchingSomeCategories = items.baseItems.filter(item => selectedCategories.some(cat => item.categories.includes(cat)));
        const baseItems = ["AND", "AND_FIRST"].includes(combinationMode) ?
            itemsMatchingAllCategories :
            itemsMatchingSomeCategories;
        const extraItems = ["AND_FIRST"].includes(combinationMode)
            ? itemsMatchingSomeCategories
                .filter(item => !itemsMatchingAllCategories.includes(item))
                .map(item => ({...item, extra: true}))
            : [];
        return {baseItems, extraItems};
    }

    // TODO : Not sure it's really elegant to already have a json object for the itemsToShow ...
    let itemsToShow = {"baseItems" : data.items, "extraItems" : []};
    if (onlyOwned) {
        itemsToShow.baseItems = itemsToShow.baseItems.filter(item => item.owned);
    }
    itemsToShow = selectedCategories.length === 0 ? itemsToShow : filterItemsOnCategories(itemsToShow);
    return itemsToShow;

}