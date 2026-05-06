import { Schema, model, Types } from "mongoose";

export type BlogPriority = "low" | "medium" | "high";

export type BlogDocument = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  author: Types.ObjectId;
  authorName: string;
  date: Date;
  priority: BlogPriority;
  readTime?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

const blogSchema = new Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [140, "Blog title cannot exceed 140 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [240, "Short description cannot exceed 240 characters"],
    },
    fullDescription: {
      type: String,
      required: [true, "Full description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    readTime: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<BlogDocument>("Blog", blogSchema);
