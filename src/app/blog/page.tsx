import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Blog() {
  return (
    <Layout>
      <h1>Blog</h1>
      <ul>
        <li><Link href="/blog/post1">Blog Post 1</Link></li>
        <li><Link href="/blog/post2">Blog Post 2</Link></li>
      </ul>
    </Layout>
  );
}
