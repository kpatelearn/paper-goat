import { getBlogPostBySlug } from '@/firebase/getBlogPostBySlug';
import { notFound } from 'next/navigation';
import Image from 'next/image';

function formatContentAsParagraphs(text: string) {
  return text
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => `<p>${line.trim()}</p>`)
    .join('');
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}
export default async function BlogPostPage({ params }: BlogPageProps) {

  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container-sm mx-auto py-12 px-6">
      <h1 className="text-display-md heading-brand mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{post.date}</p>
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-auto mb-6"
        />
      )}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: formatContentAsParagraphs(post.content),
        }}
      />
    </div>
  );
}
