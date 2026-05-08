import { AddBlogForm } from "../components/AddBlogForm";
import { ProtectedPage } from "../components/ProtectedPage";

export default function AddBlogPage() {
  return (
    <ProtectedPage>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
            Protected Editor
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Add a new blog post
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            Fill the required fields and submit to publish through the
            authenticated blog API.
          </p>
        </div>
        <AddBlogForm />
      </section>
    </ProtectedPage>
  );
}
