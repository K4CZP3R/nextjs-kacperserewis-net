'use strict';

/**
 * index-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::index-page.index-page');
