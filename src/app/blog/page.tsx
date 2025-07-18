'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { getBlogPosts, type BlogPost } from '@/firebase/getBlogPosts';
import { deleteBlogPost } from '@/firebase/deleteBlogPost';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getBlogPosts();
      setPosts(data);
    })();
    const unsub = onAuthStateChanged(auth, user => setIsAdmin(!!user));
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteBlogPost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid gap-10">
          {posts.map(post => (
            <article key={post.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                  Read More
                </Link>
                {isAdmin && (
                  <div className="flex gap-4 mt-2">
                    <button onClick={() => router.push(`/admin/blog/edit/${post.id}`)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
