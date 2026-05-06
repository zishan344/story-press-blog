import Link from "next/link";

const footerLinks = [
  ["Home", "/"],
  ["Blogs", "/blogs"],
  ["Categories", "/blogs"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="text-xl font-black text-slate-950">
            StoryPress
          </Link>
          <p className="mt-3 max-w-xl leading-7 text-slate-600">
            A compact blog platform for thoughtful articles, protected writing
            tools, and a clean reading experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          {footerLinks.map(([label, href]) => (
            <Link
              href={href}
              key={label}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-sm text-slate-500">
        Copyright 2026 StoryPress. All rights reserved.
      </div>
    </footer>
  );
}
