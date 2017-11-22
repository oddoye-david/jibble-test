'use strict';

const Boom = require('boom');
const { getRandomNumber } = require('../../utils');
const { get } = require('../../utils/json_placeholder');

const MAX_SIZES = {
  POSTS: 100,
  USERS: 10,
  ALBUMS: 100,
};

module.exports = {
  async getCollection(request, response) {
    const startingIndexForPosts = getRandomNumber(MAX_SIZES.POSTS - 30);
    const startingIndexForAlbums = getRandomNumber(MAX_SIZES.ALBUMS - 30);

    const promises = [get('posts'), get('albums'), get('users')];
    try {
      const [posts, albums, users] = await Promise.all(promises);

      return response({
        post: posts.slice(startingIndexForPosts, startingIndexForPosts + 30),
        album: albums.slice(startingIndexForAlbums, startingIndexForAlbums + 30),
        user: [...users, ...users, ...users],
      });
    } catch (error) {
      return response(Boom.badImplementation());
    }
  },
};
