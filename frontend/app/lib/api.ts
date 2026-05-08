export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider?: string;
  createdAt?: string;
};

export type BlogPost = {
  id: string;
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  author?: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  authorId?: string;
  authorName: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  readTime: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateBlogPayload = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  date: string;
  priority: BlogPost['priority'];
  readTime: string;
  imageUrl?: string;
};

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data: T;
};

type AuthData = {
  user: User;
  token: string;
};

type BackendBlog = Omit<BlogPost, 'id' | 'author'> & {
  _id: string;
  author?:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        image?: string;
      };
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000/api';

function getMessage(error: unknown, fallback: string) {
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return fallback;
}

async function parseResponse<T>(
  response: Response,
  fallback: string,
): Promise<T> {
  const body = (await response.json().catch(() => null)) as
    | ApiEnvelope<T>
    | T
    | null;

  if (!response.ok) {
    const message =
      body && typeof body === 'object' && 'message' in body ?
        String(body.message)
      : fallback;

    throw new Error(message);
  }

  if (body && typeof body === 'object' && 'data' in body) {
    return (body as ApiEnvelope<T>).data;
  }

  return body as T;
}

function normalizeBlog(blog: BackendBlog): BlogPost {
  const author = typeof blog.author === 'string' ? undefined : blog.author;

  return {
    ...blog,
    author,
    authorId: typeof blog.author === 'string' ? blog.author : blog.author?._id,
    id: blog._id,
    imageUrl:
      blog.imageUrl ||
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
  };
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  image?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse<AuthData>(response, 'Registration failed.');
}

export async function loginUser(payload: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse<AuthData>(response, 'Login failed.');
}

export async function getBlogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      cache: 'no-store',
    });
    const blogs = await parseResponse<BackendBlog[]>(
      response,
      'Could not load blogs.',
    );

    return blogs.map(normalizeBlog);
  } catch (error) {
    console.error(getMessage(error, 'Could not load blogs.'));
    return [];
  }
}

export async function getBlogById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      cache: 'no-store',
    });
    const blog = await parseResponse<BackendBlog>(
      response,
      'Could not load this blog.',
    );

    return normalizeBlog(blog);
  } catch (error) {
    throw new Error(getMessage(error, 'Could not load this blog.'));
  }
}

export async function createBlog(payload: CreateBlogPayload, token: string) {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const blog = await parseResponse<BackendBlog>(
    response,
    'Could not create blog.',
  );

  return normalizeBlog(blog);
}

export async function deleteBlog(id: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseResponse<{ id: string }>(response, 'Could not delete blog.');
}
