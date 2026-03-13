import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-shell">
        <Link href="/" className="site-header-brand">
          <span className="site-header-title">রুহুলের সাথে এআই</span>
          <span className="site-header-kicker">AI · Research · Notes</span>
        </Link>
      </div>
    </header>
  );
}
