export function getItemsToShow(data, selectedCategories, combinationMode, onlyOwned) {
    const filterItemsOnCategories = (items) => {
        const itemsMatchingAllCategories = items.filter(item => selectedCategories.every(cat => item.categories.includes(cat)));
        const itemsMatchingSomeCategories = items.filter(item => selectedCategories.some(cat => item.categories.includes(cat)));
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

    let itemsToShow = data.items;
    if (onlyOwned) {
        itemsToShow = itemsToShow.filter(item => item.owned);
    }
    return filterItemsOnCategories(itemsToShow);

}