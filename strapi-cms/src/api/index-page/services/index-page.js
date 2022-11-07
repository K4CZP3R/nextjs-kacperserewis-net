'use strict';

/**
 * index-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::index-page.index-page');
