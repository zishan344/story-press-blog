import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "./components/BlogCard";
import { posts } from "./lib/posts";

const featuredPosts = posts.slice(0, 3);
const categories = [
  { name: "Design", count: 14, tone: "bg-emerald-100 text-emerald-900" },
  { name: "Frontend", count: 19, tone: "bg-sky-100 text-sky-950" },
  { name: "Career", count: 11, tone: "bg-amber-100 text-amber-950" },
  { name: "Systems", count: 8, tone: "bg-rose-100 text-rose-950" },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f6f2e9]">
        <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm">
              Independent writing for builders and curious readers
            </p>
            <h1 className="text-5xl font-bold leading-[1.02] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
              Read sharper ideas. Publish cleaner stories.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              StoryPress is a thoughtful blog experience for product notes,
              engineering guides, design essays, and practical career lessons.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blogs"
                className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-800 px-6 text-sm font-bold text-white shadow-sm hover:bg-emerald-900"
              >
                Browse Blogs
              </Link>
              <Link
                href="/add-blog"
                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-bold text-slate-900 hover:border-slate-500"
              >
                Write a Post
              </Link>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
              alt="A writing desk with notebooks and a laptop"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full rounded-md object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-md border border-slate-200 bg-white p-5 shadow-xl">
              <p className="text-sm font-semibold text-slate-500">Editor pick</p>
              <p className="mt-2 text-xl font-bold text-slate-950">
                Design Systems That Stay Useful
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A practical guide to keeping shared patterns clear as teams grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
              Latest Posts
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Fresh reads from the journal
            </h2>
          </div>
          <Link href="/blogs" className="font-semibold text-emerald-800 hover:text-emerald-950">
            View all posts
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
              Categories
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Find the lane you are in today
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                href={`/blogs?category=${category.name}`}
                key={category.name}
                className="rounded-md border border-slate-200 bg-stone-50 p-6 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${category.tone}`}>
                  {category.name}
                </span>
                <p className="mt-5 text-3xl font-bold text-slate-950">
                  {category.count}
                </p>
                <p className="mt-2 text-sm text-slate-600">Curated articles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          ["Readable depth", "Long-form writing with clear headings, metadata, and uncluttered detail pages."],
          ["Writer workflow", "Protected pages for adding posts and managing the growing collection."],
          ["Responsive polish", "Layouts are tuned for scanning on phones, tablets, and desktop screens."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-md border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-6 h-2 w-16 rounded-full bg-amber-500" />
            <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
            <p className="mt-4 leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">
              Reader Notes
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Built for people who actually read
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <blockquote className="rounded-md bg-white/10 p-6">
              <p className="leading-7 text-slate-100">
                The layout gets out of the way. I can scan, save, and keep
                reading without fighting the interface.
              </p>
              <footer className="mt-5 text-sm font-bold text-amber-200">
                Nadia Rahman, Product Designer
              </footer>
            </blockquote>
            <blockquote className="rounded-md bg-white/10 p-6">
              <p className="leading-7 text-slate-100">
                It feels like a proper editorial product, but still simple
                enough for a course assignment.
              </p>
              <footer className="mt-5 text-sm font-bold text-amber-200">
                Arif Hasan, Frontend Developer
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-md border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-[1.3fr_0.7fr] md:p-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">
              Ready to publish your next note?
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Log in, open the protected editor, and add your first blog post
              with title, summary, full content, metadata, and an image.
            </p>
          </div>
          <Link
            href="/add-blog"
            className="inline-flex h-12 items-center justify-center rounded-md bg-amber-500 px-6 text-sm font-bold text-slate-950 hover:bg-amber-400"
          >
            Add Blog
          </Link>
        </div>
      </section>
    </>
  );
}
