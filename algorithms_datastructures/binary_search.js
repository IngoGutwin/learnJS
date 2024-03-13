/**
    * takes a sorted array and return the position of the item
    * @function
    * @param {Array} list 
    * @param {Number} item 
    */
function binary_seach(list, item) {
    let low = 0;
    let high = list.length() - 1;

    while (low <= high) {
        let mid = (low + high);
        let guess = list[mid];

        if (guess == item) {
            return mid;
        }
        if (guess > item) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    };
    return null;
}

const my_list = [1, 3, 5, 7, 9];

const result = binary_seach(my_list, 3);
