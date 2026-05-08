"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { deleteBlog, getBlogs, type BlogPost } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export function ManageBlogs() {
  const { token, user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const ownPosts = useMemo(() => {
    if (!user) {
      return [];
    }

    return posts.filter((post) => {
      const authorId = post.authorId ?? post.author?._id;
      const authorEmail = post.author?.email;

      return authorId === user.id || authorEmail === user.email;
    });
  }, [posts, user]);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      setLoading(true);
      setMessage("");

      try {
        const nextPosts = await getBlogs();

        if (active) {
          setPosts(nextPosts);
        }
      } catch (caughtError) {
        if (active) {
          setMessage(
            caughtError instanceof Error ?
              caughtError.message
            : "Could not load blogs.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  const deletePost = async (id: string) => {
    if (!token || !user) {
      setMessage("Please log in again before deleting a blog.");
      return;
    }

    const targetPost = ownPosts.find((post) => post.id === id);

    if (!targetPost) {
      setMessage("You can only delete your own blog posts.");
      return;
    }

    const confirmed = window.confirm("Delete this blog post?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteBlog(id, token);
      setPosts((current) => current.filter((post) => post.id !== id));
      setMessage("Blog deleted successfully.");
    } catch (caughtError) {
      setMessage(
        caughtError instanceof Error ?
          caughtError.message
        : "Could not delete blog.",
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 shadow-sm">
        <div className="h-40 animate-pulse rounded-md bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      {message && (
        <p
          className={`border-b px-5 py-3 text-sm font-semibold ${
            message.includes("successfully")
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {message}
        </p>
      )}
      <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600 md:grid-cols-[1.4fr_0.7fr_0.7fr_160px]">
        <span>Post</span>
        <span>Category</span>
        <span>Priority</span>
        <span>Actions</span>
      </div>
      <div className="divide-y divide-slate-200">
        {ownPosts.length > 0 ?
          ownPosts.map((post) => (
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
                  className="rounded-md border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        : (
          <div className="px-5 py-10 text-center">
            <h2 className="text-2xl font-bold text-slate-950">No blogs yet</h2>
            <p className="mt-2 text-slate-600">
              Your published blogs from the API will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
