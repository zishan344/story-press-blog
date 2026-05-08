import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../lib/api";

export function BlogCard({ post }: { post: BlogPost }) {
  const publishedDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.date));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={800}
        height={500}
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">
            {post.category}
          </span>
          <span>{post.readTime}</span>
        </div>
        <h2 className="text-xl font-bold leading-7 text-slate-950">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {post.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-sm font-medium text-slate-500">{publishedDate}</span>
          <Link
            href={`/blogs/${post.id}`}
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
