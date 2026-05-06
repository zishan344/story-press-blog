"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost } from "../lib/posts";

const storageKey = "storypress-local-posts";

export function ManageBlogs({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [localPosts, setLocalPosts] = useState<BlogPost[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as BlogPost[];
  });

  const allPosts = useMemo(
    () => [...localPosts, ...initialPosts],
    [localPosts, initialPosts],
  );

  const deletePost = (id: string) => {
    const nextPosts = localPosts.filter((post) => post.id !== id);
    setLocalPosts(nextPosts);
    window.localStorage.setItem(storageKey, JSON.stringify(nextPosts));
  };

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600 md:grid-cols-[1.4fr_0.7fr_0.7fr_160px]">
        <span>Post</span>
        <span>Category</span>
        <span>Priority</span>
        <span>Actions</span>
      </div>
      <div className="divide-y divide-slate-200">
        {allPosts.map((post) => {
          const canDelete = localPosts.some((localPost) => localPost.id === post.id);

          return (
            <div
              key={post.id}
              className="grid gap-4 px-5 py-5 md:grid-cols-[1.4fr_0.7fr_0.7fr_160px] md:items-center"
            >
              <div>
                <h2 className="font-bold text-slate-950">{post.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {post.shortDescription}
                </p>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {post.category}
              </span>
              <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase text-amber-900">
                {post.priority}
              </span>
              <div className="flex gap-2">
                <Link
                  href={`/blogs/${post.id}`}
                  className="rounded-md bg-slate-950 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-800"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => deletePost(post.id)}
                  disabled={!canDelete}
                  className="rounded-md border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
