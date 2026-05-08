import { ManageBlogs } from "../components/ManageBlogs";
import { ProtectedPage } from "../components/ProtectedPage";

export default function ManageBlogsPage() {
  return (
    <ProtectedPage>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
            Protected Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Manage blog posts
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            Review posts from the live API, open detail pages, and delete posts
            with your authenticated session.
          </p>
        </div>
        <ManageBlogs />
      </section>
    </ProtectedPage>
  );
}
