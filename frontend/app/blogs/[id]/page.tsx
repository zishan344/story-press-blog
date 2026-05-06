import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, posts } from "../../lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-400"
          >
            Back to Blogs
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
                {post.category}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
                <span>{post.authorName}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">
                  {post.priority} priority
                </span>
              </div>
            </div>
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1200}
              height={750}
              priority
              className="aspect-[16/10] w-full rounded-md object-cover shadow-xl"
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-xl font-semibold leading-9 text-slate-800">
          {post.shortDescription}
        </p>
        <div className="mt-8 space-y-6 text-lg leading-9 text-slate-700">
          {post.fullDescription.split(". ").map((paragraph) => (
            <p key={paragraph}>{paragraph.endsWith(".") ? paragraph : `${paragraph}.`}</p>
          ))}
        </div>
      </section>
    </article>
  );
}
