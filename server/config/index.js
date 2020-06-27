import path from 'path';

// Imports enviornment variables for use
import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const DIST_DIR = path.resolve(__dirname, '../dist/');
const PUBLIC_DIST_DIR = path.resolve(__dirname, '../dist/public');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

export default {
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api/v1/',
  },
  dist: {
    path: DIST_DIR,
    public_path: PUBLIC_DIST_DIR,
  },
  editor: {
    path: HTML_FILE,
  },
};
