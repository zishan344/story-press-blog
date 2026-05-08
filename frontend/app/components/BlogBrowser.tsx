"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "./BlogCard";
import type { BlogPost } from "../lib/api";

export function BlogBrowser({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery = `${post.title} ${post.shortDescription} ${post.category}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "All" || post.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Search posts
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, summary, or category"
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-950 placeholder:text-slate-400"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Category
          </span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950"
          >
            <option>All</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-950">No posts found</h2>
          <p className="mt-3 text-slate-600">
            Try a different keyword or choose another category.
          </p>
        </div>
      )}
    </div>
  );
}
