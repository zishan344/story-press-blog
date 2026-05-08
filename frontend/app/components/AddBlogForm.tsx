"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { createBlog, type BlogPost } from "../lib/api";

export function AddBlogForm() {
  const router = useRouter();
  const { token } = useAuth();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "Design",
    date: new Date().toISOString().slice(0, 10),
    priority: "medium",
    readTime: "5 min read",
    imageUrl: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    if (!form.title || !form.shortDescription || !form.fullDescription || !form.category || !form.date) {
      setStatus("Please fill in title, short description, full description, category, and date.");
      return;
    }

    if (!token) {
      setStatus("Please log in again before submitting a blog.");
      return;
    }

    setLoading(true);

    try {
      const newPost = await createBlog(
        {
          ...form,
          date: new Date(form.date).toISOString(),
          priority: form.priority as BlogPost["priority"],
          imageUrl:
            form.imageUrl ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
        },
        token,
      );

      setStatus("Blog post added successfully.");
      setForm({
        title: "",
        shortDescription: "",
        fullDescription: "",
        category: "Design",
        date: new Date().toISOString().slice(0, 10),
        priority: "medium",
        readTime: "5 min read",
        imageUrl: "",
      });
      router.push(`/blogs/${newPost.id}`);
      router.refresh();
    } catch (caughtError) {
      setStatus(
        caughtError instanceof Error ?
          caughtError.message
        : "Could not create blog. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Title
          </span>
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
            placeholder="Post title"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Category
          </span>
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
          >
            <option>Design</option>
            <option>Frontend</option>
            <option>Career</option>
            <option>Systems</option>
          </select>
        </label>
      </div>
      <label>
        <span className="mb-2 block text-sm font-bold text-slate-700">
          Short description
        </span>
        <input
          value={form.shortDescription}
          onChange={(event) => updateField("shortDescription", event.target.value)}
          className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
          placeholder="One or two lines for the blog card"
        />
      </label>
      <label>
        <span className="mb-2 block text-sm font-bold text-slate-700">
          Full description
        </span>
        <textarea
          value={form.fullDescription}
          onChange={(event) => updateField("fullDescription", event.target.value)}
          className="min-h-44 w-full rounded-md border border-slate-300 px-4 py-3 text-sm leading-6"
          placeholder="Write the full blog content"
        />
      </label>
      <div className="grid gap-5 md:grid-cols-4">
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Date
          </span>
          <input
            type="date"
            value={form.date}
            onChange={(event) => updateField("date", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Priority
          </span>
          <select
            value={form.priority}
            onChange={(event) => updateField("priority", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Read time
          </span>
          <input
            value={form.readTime}
            onChange={(event) => updateField("readTime", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Image URL
          </span>
          <input
            value={form.imageUrl}
            onChange={(event) => updateField("imageUrl", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
            placeholder="Optional"
          />
        </label>
      </div>

      {status && (
        <p
          className={`rounded-md px-4 py-3 text-sm font-semibold ${
            status.includes("successfully")
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {status}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="h-12 rounded-md bg-emerald-800 px-6 text-sm font-bold text-white hover:bg-emerald-900 md:w-fit"
      >
        {loading ? "Submitting..." : "Submit Blog"}
      </button>
    </form>
  );
}
