export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
        Contact
      </p>
      <h1 className="mt-3 text-4xl font-bold text-slate-950">
        Send the editorial team a note
      </h1>
      <div className="mt-8 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Message
          </span>
          <textarea
            className="min-h-40 w-full rounded-md border border-slate-300 px-4 py-3 text-sm"
            placeholder="Share a topic idea or feedback"
          />
        </label>
        <button className="mt-4 h-12 rounded-md bg-emerald-800 px-6 text-sm font-bold text-white hover:bg-emerald-900">
          Send Message
        </button>
      </div>
    </section>
  );
}
