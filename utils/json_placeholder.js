'use strict';

const axios = require('axios');

const jsonPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

module.exports = {
  async get(entityName) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }
    const { data: entities } = await jsonPlaceholder.get(`/${entityName}`);

    return entities;
  },
  async getById(entityName, entityId) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }

    if (!entityId) {
      throw new Error('Please provide an entity id');
    }
    const { data: entity } = await jsonPlaceholder.get(`/${entityName}/${entityId}`);

    return entity;
  },
  async create(entityName, entity) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }
    if (!entity || typeof entity !== 'object') {
      throw new Error('Please provide an entity');
    }
    const { data: singleEntity } = await jsonPlaceholder.post(`/${entity}`, { ...entity });

    return singleEntity;
  },
  async update(entityName, entityId, updatedEntity) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }

    if (!updatedEntity || typeof updatedEntity !== 'object') {
      throw new Error('Please provide an updatedEntity');
    }

    if (!entityId) {
      throw new Error('Please provide an updatedEntity');
    }

    const { data: entity } = await jsonPlaceholder.patch(`/${entityName}/${entityId}`, { ...updatedEntity });

    return entity;
  },
  async deleteById(entityName, entityId) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }

    if (!entityId) {
      throw new Error('Please provide an entity id');
    }
    await jsonPlaceholder.delete(`/${entityName}/${entityId}`);

    return true;
  },
};
