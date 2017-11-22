'use strict';

const Boom = require('boom');

const {
  get,
  getById,
  create,
  update,
  deleteById,
} = require('../../utils/json_placeholder');

module.exports = {
  /**
   * Get all Posts
   *
   * @param {Func} request
   * @param {Func} response
   * @returns Response
   */
  async getPosts(request, response) {
    try {
      const posts = await get('posts');

      return response(posts);
    } catch (error) {
      return response(Boom.badImplementation('Unable to get posts'));
    }
  },
  /**
   * Get a Post using it's ID
   *
   * @param {Func} request
   * @param {Func} response
   * @returns Response
   */
  async getPost(request, response) {
    const { postId } = request.params;

    try {
      const post = await getById('posts', postId);

      return response(post);
    } catch (error) {
      return response(Boom.badImplementation('Unable to get post'));
    }
  },
  /**
   * Create a Post
   *
   * @param {Func} request
   * @param {Func} response
   * @returns Response
   */
  async createPost(request, response) {
    const post = { ...request.payload };

    try {
      const createdPost = await create('posts', post);

      return response(createdPost);
    } catch (error) {
      return response(Boom.badImplementation('Unable to create post'));
    }
  },
  /**
   * Update a Post
   *
   * @param {Func} request
   * @param {Func} response
   * @returns Response
   */
  async updatePost(request, response) {
    const post = { ...request.payload };
    const { postId } = request.params;

    try {
      const updatedPost = await update('posts', postId, post);

      return response(updatedPost);
    } catch (error) {
      return response(Boom.badImplementation('Unable to update post'));
    }
  },
  /**
   * Delete a Post
   *
   * @param {Func} request
   * @param {Func} response
   * @returns Response
   */
  async deletePost(request, response) {
    const { postId } = request.params;

    try {
      await deleteById('posts', postId);

      return response();
    } catch (error) {
      return response(Boom.badImplementation('Unable to get post'));
    }
  },
};
