// function to sort an array
function sortArrayByKey(array, property, type = "string", order = "d") {
  return [...array].sort((a, b) => {
    if (type === "number") {
      if (order === "c") {
        return a[property] - b[property];
      };
      return b[property] - a[property];
    };
    return a[property].localeCompare(b[property]);
  });
};

// the standard method is to sort the array alphabetically where the parameter to use as a base to sort is strings, if necessary, sort based on number values, pass the third parameter as "number"

module.exports = { sortArrayByKey };