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
  async getPosts(request, response) {
    try {
      const posts = await get('posts');

      return response(posts);
    } catch (error) {
      return response(Boom.badImplementation('Unable to get posts'));
    }
  },
  async getPost(request, response) {
    const { postId } = request.params;

    try {
      const post = await getById('posts', postId);

      return response(post);
    } catch (error) {
      return response(Boom.badImplementation('Unable to get post'));
    }
  },
  async createPost(request, response) {
    const post = { ...request.payload };

    try {
      const createdPost = await create('posts', post);

      return response(createdPost);
    } catch (error) {
      return response(Boom.badImplementation('Unable to create post'));
    }
  },

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
