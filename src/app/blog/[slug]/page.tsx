import { getBlogPostBySlug } from '@/firebase/getBlogPostBySlug';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
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
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
