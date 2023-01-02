/*
    [...Array(strSize)] = create array with the given size
    Math.floor(Math.random() * 35) = generate random number between 0 to 35
    .toString(35) = convert the random number (0 to 35) to 0-9 and a-z
    .join("") = convert the array to string and return it
*/
const generateRandomAlphaNum = (strSize) => {
  return [...Array(strSize)]
    .map(() => Math.floor(Math.random() * 35).toString(35))
    .join("");
};

module.exports = generateRandomAlphaNum;
