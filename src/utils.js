export function arraysEqual(arr1, arr2) {
    // Check if arrays have the same length
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Sort arrays to ignore order
    const sortedArr1 = arr1.sort();
    const sortedArr2 = arr2.sort();

    // Check if all elements are equal
    return sortedArr1.every((element, index) => element === sortedArr2[index]);
}

