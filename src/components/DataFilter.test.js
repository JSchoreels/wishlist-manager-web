import {getItemsToShow} from "./DataFilter";

describe('getItemsToShow', () => {
    const data = {
        items: [
            {
                id: 1,
                name: 'Item 1',
                categories: ['cat1', 'cat2'],
                owned: true
            },
            {
                id: 2,
                name: 'Item 2',
                categories: ['cat2', 'cat3'],
                owned: false
            },
            {
                id: 3,
                name: 'Item 3',
                categories: ['cat1', 'cat3'],
                owned: true
            },
            {
                id: 4,
                name: 'Item 4',
                categories: [],
                owned: false
            }
        ]
    };

    it('should return all items when no categories are selected with OR', () => {
        const selectedCategories = [];
        const combinationMode = 'OR';
        const onlyOwned = false;

        const result = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);

        expect(result.baseItems).toEqual(data.items);
        expect(result.extraItems).toEqual([]);
    });

    it('should return all items when no categories are selected with AND', () => {
        const selectedCategories = [];
        const combinationMode = 'AND';
        const onlyOwned = false;

        const result = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);

        expect(result.baseItems).toEqual(data.items);
        expect(result.extraItems).toEqual([]);
    });

    it('should return items matching all selected categories', () => {
        const selectedCategories = ['cat1', 'cat2'];
        const combinationMode = 'AND';
        const onlyOwned = false;

        const result = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);

        expect(result.baseItems).toEqual([data.items[0]]);
        expect(result.extraItems).toEqual([]);
    });

    it('should return items matching some selected categories', () => {
        const selectedCategories = ['cat1'];
        const combinationMode = 'AND';
        const onlyOwned = false;

        const result = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);

        expect(result.baseItems).toEqual([data.items[0], data.items[2]]);
        expect(result.extraItems).toEqual([]);
    });

    it('should return items matching any selected category', () => {
        const selectedCategories = ['cat2', 'cat3'];
        const combinationMode = 'OR';
        const onlyOwned = false;

        const result = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);

        expect(result.baseItems).toEqual([data.items[0], data.items[1], data.items[2]]);
        expect(result.extraItems).toEqual([]);
    });

    it('should return only owned items when onlyOwned is true', () => {
        const selectedCategories = ['cat1', 'cat2'];
        const combinationMode = 'OR';
        const onlyOwned = true;

        const result = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);

        expect(result.baseItems).toEqual([data.items[0], data.items[2]]);
        expect(result.extraItems).toEqual([]);
    });

    it('should return items in extra if they don\'t match all selectedCategories', () => {
        const selectedCategories = ['cat1', 'cat2'];
        const combinationMode = 'AND_FIRST';
        const onlyOwned = false;

        const result = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);

        expect(result.baseItems).toEqual([data.items[0]]);
        expect(result.extraItems).toEqual([data.items[1], data.items[2]].map(item => ({...item, extra: true})));
    });

    it('should return items in extra if they don\'t match all selectedCategories + onlyOwned', () => {
        const selectedCategories = ['cat1', 'cat2'];
        const combinationMode = 'AND_FIRST';
        const onlyOwned = true;

        const result = getItemsToShow(data, selectedCategories, combinationMode, onlyOwned);

        expect(result.baseItems).toEqual([data.items[0]]);
        expect(result.extraItems).toEqual([data.items[2]].map(item => ({...item, extra: true})));
    });

});