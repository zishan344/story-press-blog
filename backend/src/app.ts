import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import './types/express.d.ts';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Blog API is running',
  });
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
