import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogIndex() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">博客</h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-gray-100 pb-8 last:border-none">
            <Link
              href={`/${post.slug}`}
              className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {post.title}
            </Link>

            <time className="block text-sm text-gray-400 mt-1">{post.date}</time>

            <p className="text-gray-600 mt-2 leading-relaxed">{post?.excerpt}</p>

            {post.tags && (
              <div className="flex gap-2 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
