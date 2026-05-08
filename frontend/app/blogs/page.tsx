import { BlogBrowser } from "../components/BlogBrowser";
import { getBlogs } from "../lib/api";

export default async function BlogsPage() {
  const posts = await getBlogs();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
          Blog Library
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          Browse articles and field notes
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Search through the latest posts from the live blog API and narrow the
          library by category.
        </p>
      </div>
      <BlogBrowser posts={posts} categories={categories} />
    </section>
  );
}
