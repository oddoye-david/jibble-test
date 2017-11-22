'use strict';

const axios = require('axios');

const jsonPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

module.exports = {
  async get(entityName) {
    const { data: entities } = await jsonPlaceholder.get(`/${entityName}`);

    return entities;
  },
  async getById(entityName, entityId) {
    const { data: entity } = await jsonPlaceholder.get(`/${entityName}/${entityId}`);

    return entity;
  },
  async create(entity) {
    const { data: singleEntity } = await jsonPlaceholder.post(`/${entity}`, { ...entity });

    return singleEntity;
  },
  async update(entityName, entityId, updatedEntity) {
    const { data: entity } = await jsonPlaceholder.patch(`/${entityName}/${entityId}`, { ...updatedEntity });

    return entity;
  },
  async delete(entityName, entityId) {
    await jsonPlaceholder.delete(`/${entityName}/${entityId}`);

    return true;
  },
};
