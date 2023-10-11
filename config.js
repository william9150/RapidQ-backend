/* eslint-disable operator-linebreak */
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  dotenv.config();
  consola.success('.env file loaded successfully');
} else if (fs.existsSync('sample.env')) {
  dotenv.config({ path: 'sample.env' });
  consola.success('sample.env file loaded successfully');
} else {
  consola.error('No .env or sample.env file found');
}

function getDefault(value, defaultValue) {
  if (!value || value === 'undefined') {
    return defaultValue;
  }
  return value;
}

const productionHosts = [''];
const devHosts = ['http://localhost:3000'];

export const config = {
  IS_DEVELOPMENT: getDefault(process.env.NODE_ENV, 'development') !== 'production',

  ALGOLIA_ID: getDefault(process.env.ALGOLIA_ID, 'latency'),
  ALGOLIA_SEARCH_API_KEY: getDefault(process.env.ALGOLIA_SEARCH_API_KEY, '56f24e4276091e774e8157fe4b8b11f6'),
  ALGOLIA_INDEX_NAME: getDefault(process.env.ALGOLIA_INDEX_NAME, 'movies'),

  DB_URL: getDefault(process.env.DB_URL, 'mongodb://localhost:27017/RapidQQ'),
  JWT_SECRET: getDefault(process.env.JWT_SECRET, 'REDACTED'),
  API_PORT: process.env.API_PORT ? Number.parseInt(process.env.API_PORT, 10) : 3000,
  SOCKET_PORT: process.env.SOCKET_PORT ? Number.parseInt(process.env.SOCKET_PORT, 10) : 65080,
  REDIS_PORT: process.env.REDIS_PORT ? Number.parseInt(process.env.REDIS_PORT, 10) : 6379,
  REDIS_HOST: getDefault(process.env.REDIS_HOST, 'localhost'),

  SALT_ROUNDS: process.env.SALT_ROUNDS ? Number.parseInt(process.env.SALT_ROUNDS, 10) : 6,
  DEFAULT_MAX_TIMER: 120 * 1000,
  DEFAULT_MAX_PLAYERS: 14,

  ALLOWLIST_HOSTS: getDefault(process.env.NODE_ENV, 'development') === 'production' ? productionHosts : devHosts,

  ROOM_ID_RX: /^([A-Z\d]){6}$/,
  ATTRIBUTES_TO_RETRIEVE:
    getDefault(process.env.NODE_ENV, 'development') === 'production'
      ? ['name', 'positions', 'Overall Rating', 'Skill Moves', 'objectID', 'photo_url']
      : ['title', 'image', 'rating', 'score', 'year', 'genre'],
};
