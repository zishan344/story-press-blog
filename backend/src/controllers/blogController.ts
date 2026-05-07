import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Blog } from '../models/Blog';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/sendResponse';

export const getBlogs = asyncHandler(async (req: Request, res: Response) => {
  const { search, category } = req.query;
  const filter: Record<string, unknown> = {};

  if (typeof category === 'string' && category.trim()) {
    filter.category = category.trim();
  }

  if (typeof search === 'string' && search.trim()) {
    const pattern = new RegExp(search.trim(), 'i');
    filter.$or = [
      { title: pattern },
      { shortDescription: pattern },
      { fullDescription: pattern },
      { category: pattern },
    ];
  }

  const blogs = await Blog.find(filter)
    .populate('author', 'name email image')
    .sort({ createdAt: -1 });

  sendSuccess(res, 200, 'Blogs fetched successfully', blogs);
});

export const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Blog post not found', 404);
  }

  const blog = await Blog.findById(id).populate('author', 'name email image');

  if (!blog) {
    throw new AppError('Blog post not found', 404);
  }

  sendSuccess(res, 200, 'Blog fetched successfully', blog);
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Authentication is required', 401);
  }

  const {
    title,
    shortDescription,
    fullDescription,
    category,
    date,
    priority,
    readTime,
    imageUrl,
  } = req.body;

  if (!title || !shortDescription || !fullDescription || !category) {
    throw new AppError(
      'Title, short description, full description, and category are required',
      400,
    );
  }

  const blog = await Blog.create({
    title,
    shortDescription,
    fullDescription,
    category,
    date: date ? new Date(date) : undefined,
    priority,
    readTime,
    imageUrl,
    author: req.user._id,
    authorName: req.user.name,
  });

  sendSuccess(res, 201, 'Blog created successfully', blog);
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Blog post not found', 404);
  }

  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (!deletedBlog) {
    throw new AppError('Blog post not found', 404);
  }

  sendSuccess(res, 200, 'Blog deleted successfully', {
    id: deletedBlog.id,
  });
});
