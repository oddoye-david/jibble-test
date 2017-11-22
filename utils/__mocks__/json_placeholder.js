'use strict';

const entities = {
  users: [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
  ],
  posts: [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    },
  ],
  albums: [{
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim',
  }],
};

module.exports = {
  async get(entityName) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }


    return entities[entityName];
  },
  async getById(entityName, entityId) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }

    if (!entityId) {
      throw new Error('Please provide an entity id');
    }


    return entities[entityName].find(x => x.id == entityId);
  },
  async create(entityName, entity) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }
    if (!entity || typeof entity !== 'object') {
      throw new Error('Please provide an entity');
    }

    return entity;
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

    return updatedEntity;
  },
  async deleteById(entityName, entityId) {
    if (!entityName) {
      throw new Error('Please provide an entity name');
    }

    if (!entityId) {
      throw new Error('Please provide an entity id');
    }

    return true;
  },
};
