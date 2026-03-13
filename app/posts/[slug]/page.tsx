import Link from "next/link";
import { getPostData, getAllPostSlugs } from "../../../lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function PostPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const postData = getPostData(params.slug);

  if (!postData) {
    notFound();
  }

  return (
    <main className="blog-container">
      <article className="single-post">
        <p className="single-post-date">
          {postData.date || ""}
        </p>

        <h1 className="single-post-title">
          {postData.title || postData.slug}
        </h1>

        {postData.excerpt ? (
          <p className="single-post-excerpt">{postData.excerpt}</p>
        ) : null}

        <div className="single-post-content prose max-w-none react-markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {postData.content}
          </ReactMarkdown>
        </div>

        <Link href="/" className="back-home-link">
          ← Back to home
        </Link>
      </article>
    </main>
  );
}