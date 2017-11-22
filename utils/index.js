module.exports = {
  /**
   * Returns a random number
   *
   * @param {Number} max
   * @returns Number
   */
  getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  },
  /**
   * Returns a random set from a list
   *
   * @param {Array} list
   * @param {Number} maxNumber
   * @returns Array
   */
  getRandomItems(list, maxNumber) {
    const { length } = list;
    const startingIndex =
      length > Number(maxNumber) ? this.getRandomNumber(length - Number(maxNumber)) : 0;
    return list.slice(startingIndex, startingIndex + Number(maxNumber));
  },
};
