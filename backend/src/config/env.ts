import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 5000),
  DATABASE_URL:
    process.env.DATABASE_URL ??
    'mongodb://root:example@127.0.0.1:27017/blog_website?authSource=admin',
  JWT_SECRET: process.env.JWT_SECRET ?? 'local-blog-development-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:3000',
};
