'use strict';

const Boom = require('boom');
const { getRandomItems } = require('../../utils');
const { get } = require('../../utils/json_placeholder');

module.exports = {
  /**
   * Get Posts, Albums and Users. Return in collection
   *
   * @param {Func} request
   * @param {Func} response
   * @returns Response
   */
  async getCollection(request, response) {
    const promises = [get('posts'), get('albums'), get('users')];
    try {
      const [posts, albums, users] = await Promise.all(promises);

      return response({
        post: getRandomItems(posts, 30),
        album: getRandomItems(albums, 30),
        user: getRandomItems(users, 30),
      });
    } catch (error) {
      return response(Boom.badImplementation());
    }
  },
};
