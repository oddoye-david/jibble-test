'use strict';

const { getRandomItems } = require('../../src/utils');

describe('#getRandomItems', () => {
  it('Should return an array of items', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];

    const randomItems = getRandomItems(items, 4);

    expect(Array.isArray(randomItems)).toEqual(true);
    expect(randomItems.length).toEqual(4);
  });

  it('Should return all the items given a size larger than list length', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];

    const randomItems = getRandomItems(items, 10);

    expect(Array.isArray(randomItems)).toEqual(true);
    expect(randomItems.length).toEqual(items.length);
  });
});
