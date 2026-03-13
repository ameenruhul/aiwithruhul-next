import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="blog-home">
      <div className="blog-shell">
        <header className="blog-hero">
          <p className="blog-description">
            Thoughts on AI, research, systems, and building things.
          </p>
        </header>

        <section className="blog-posts">
          {posts.length === 0 ? (
            <p className="empty-state">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="post-row">
                <div className="post-meta">
                  <span>{post.date || ""}</span>
                </div>

                <div className="post-main">
                  <h2 className="post-title">
                    <Link href={`/posts/${post.slug}`}>{post.title || post.slug}</Link>
                  </h2>

                  {post.excerpt ? (
                    <p className="post-excerpt">{post.excerpt}</p>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}