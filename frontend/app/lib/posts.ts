export type BlogPost = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  authorName: string;
  date: string;
  priority: "low" | "medium" | "high";
  readTime: string;
  imageUrl: string;
};

export const posts: BlogPost[] = [
  {
    id: "design-systems-that-stay-useful",
    title: "Design Systems That Stay Useful",
    shortDescription:
      "How to keep shared UI patterns helpful after the first beautiful launch.",
    fullDescription:
      "A design system is only useful when teams can trust it during real delivery pressure. This essay walks through naming, contribution rules, accessibility checks, documentation habits, and the small maintenance rituals that keep components from becoming decorative inventory. The goal is a system that helps teams ship consistent interfaces without slowing down good product thinking.",
    category: "Design",
    authorName: "Nadia Rahman",
    date: "May 3, 2026",
    priority: "high",
    readTime: "7 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "app-router-patterns-for-blog-ux",
    title: "App Router Patterns for Blog UX",
    shortDescription:
      "Simple routing patterns that make content-heavy Next.js sites feel fast.",
    fullDescription:
      "The App Router makes it straightforward to compose shared layouts, dynamic detail pages, loading states, and server-rendered content. This guide explains how a blog can use clear route structure, static sample data, and focused client components for search, forms, and auth-like interactions while keeping the main reading experience quick and predictable.",
    category: "Frontend",
    authorName: "Samir Chowdhury",
    date: "April 29, 2026",
    priority: "medium",
    readTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "writing-product-notes-people-finish",
    title: "Writing Product Notes People Finish",
    shortDescription:
      "A practical structure for notes that teach, persuade, and stay readable.",
    fullDescription:
      "Good product writing respects the reader's time. Start with a clear promise, add context only where it improves decisions, and use examples to carry the argument. This post gives a repeatable outline for product notes, from opening hook to evidence, tradeoffs, decisions, and closing next steps.",
    category: "Career",
    authorName: "Maliha Karim",
    date: "April 22, 2026",
    priority: "medium",
    readTime: "5 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "search-ui-for-small-content-sites",
    title: "Search UI for Small Content Sites",
    shortDescription:
      "Designing filters that feel useful before you need complex search infrastructure.",
    fullDescription:
      "Small content products often need clarity more than infrastructure. A useful search interface can begin with local filtering, category controls, strong empty states, and cards with enough metadata to support quick decisions. This guide shows how to avoid overbuilding while still making the content library feel intentional.",
    category: "Frontend",
    authorName: "Tanvir Ahmed",
    date: "April 17, 2026",
    priority: "low",
    readTime: "4 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "calm-dashboards-for-managing-content",
    title: "Calm Dashboards for Managing Content",
    shortDescription:
      "How to make admin screens feel efficient without turning them into spreadsheets.",
    fullDescription:
      "A content management screen should be dense enough to scan and calm enough to use every day. This article covers responsive tables, destructive action states, empty views, metadata grouping, and how to make management flows feel complete even when the feature set is intentionally small.",
    category: "Systems",
    authorName: "Rafi Islam",
    date: "April 9, 2026",
    priority: "high",
    readTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "from-assignment-to-portfolio-piece",
    title: "From Assignment to Portfolio Piece",
    shortDescription:
      "Turning a small required project into something that shows taste and judgment.",
    fullDescription:
      "The difference between meeting requirements and making a portfolio-worthy project is often care. Strong route coverage, polished spacing, responsive behavior, realistic data, and complete states make a simple assignment feel deliberate. This post explains how to choose where polish matters most when time is limited.",
    category: "Career",
    authorName: "Ishrat Jahan",
    date: "March 31, 2026",
    priority: "medium",
    readTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  },
];

export const categories = Array.from(new Set(posts.map((post) => post.category)));

export function getPostById(id: string) {
  return posts.find((post) => post.id === id);
}
