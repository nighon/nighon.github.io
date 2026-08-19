import { getAllPostSlugs, getPostData } from '@/lib/posts';

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <article>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
        <time className="block text-sm text-gray-400 mb-10">{post.date}</time>

        <div
          className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
