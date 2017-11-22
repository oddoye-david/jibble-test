'use strict';

const Boom = require('boom');
const { getRandomNumber } = require('../../utils');
const { get } = require('../../utils/json_placeholder');
const { MAX_POSTS_SIZE, MAX_ALBUMS_SIZE } = require('../../config');

module.exports = {
  async getCollection(request, response) {
    const startingIndexForPosts = getRandomNumber((MAX_POSTS_SIZE || 100) - 30);
    const startingIndexForAlbums = getRandomNumber((MAX_ALBUMS_SIZE || 100) - 30);

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
