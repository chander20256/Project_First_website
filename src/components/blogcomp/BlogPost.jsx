import { useState, useEffect, useRef } from "react";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// ─── SANITY SETUP ─────────────────────────────────────────────────────────────
const client = createClient({
  projectId:  "os6cjfhs",
  dataset:    "production",
  apiVersion: "2024-01-01",
  useCdn:     false,
  token:      import.meta.env.VITE_SANITY_TOKEN || "",
});
const builder = createImageUrlBuilder(client);
const urlFor  = (src) => src ? builder.image(src) : null;

// ─── QUERY ────────────────────────────────────────────────────────────────────
const POST_QUERY = (slug) => `*[_type == "post" && slug.current == $slug][0] {
  _id, title,
  "slug": slug.current,
  desc, body,
  mainImage, publishedAt,
  author, avatar,
  tag, tagColor, readTime,
  "relatedPosts": *[_type == "post" && slug.current != $slug && tag == ^.tag] | order(publishedAt desc) [0..2] {
    _id, title, "slug": slug.current, mainImage, publishedAt, tag
  }
}`;

// ─── PORTABLE TEXT RENDERER ───────────────────────────────────────────────────
function PortableTextRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) {
    return (
      <p style={{ color: "#666", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, lineHeight: 1.85 }}>
        No content available for this post yet.
      </p>
    );
  }

  const renderMark = (text, marks = []) => {
    let node = text;
    if (marks.includes("strong"))
      node = <strong style={{ color: "#0D0D0D", fontWeight: 700 }}>{node}</strong>;
    if (marks.includes("em"))
      node = <em style={{ fontStyle: "italic", color: "#333" }}>{node}</em>;
    if (marks.includes("code"))
      node = <code style={{ background: "#FFF5F2", border: "1px solid #FDDDD5", borderRadius: 4, padding: "2px 7px", fontFamily: "monospace", fontSize: "0.88em", color: "#F4500F" }}>{node}</code>;
    if (marks.includes("underline"))
      node = <span style={{ textDecoration: "underline", textDecorationColor: "#F4500F" }}>{node}</span>;
    return node;
  };

  const renderSpan = (span, markDefs = []) => {
    const marks    = span.marks || [];
    const linkMark = marks.find(m => markDefs.find(d => d._key === m && d._type === "link"));
    if (linkMark) {
      const def = markDefs.find(d => d._key === linkMark);
      return (
        <a href={def?.href} target="_blank" rel="noopener noreferrer"
          style={{ color: "#F4500F", textDecoration: "underline", textDecorationColor: "rgba(244,80,15,0.35)", textUnderlineOffset: 3, transition: "color 0.2s" }}
          onMouseEnter={e => e.target.style.color = "#D93E0C"}
          onMouseLeave={e => e.target.style.color = "#F4500F"}
        >
          {renderMark(span.text, marks.filter(m => m !== linkMark))}
        </a>
      );
    }
    return renderMark(span.text, marks);
  };

  const renderBlock = (block, idx) => {
    const style    = block.style || "normal";
    const children = (block.children || []).map((child, ci) => (
      <span key={ci}>{renderSpan(child, block.markDefs || [])}</span>
    ));

    const headingBase = {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      color: "#0D0D0D",
      lineHeight: 1.2,
      scrollMarginTop: 100,
    };

    if (style === "h1") return <h1 key={idx} id={`h-${idx}`} style={{ ...headingBase, fontSize: "clamp(26px,3vw,40px)", margin: "52px 0 18px" }}>{children}</h1>;
    if (style === "h2") return <h2 key={idx} id={`h-${idx}`} style={{ ...headingBase, fontSize: "clamp(20px,2.4vw,30px)", margin: "44px 0 16px" }}>{children}</h2>;
    if (style === "h3") return <h3 key={idx} id={`h-${idx}`} style={{ ...headingBase, fontSize: "clamp(17px,1.8vw,22px)", margin: "32px 0 12px", fontWeight: 600 }}>{children}</h3>;
    if (style === "h4") return <h4 key={idx} id={`h-${idx}`} style={{ ...headingBase, fontSize: "clamp(15px,1.4vw,18px)", margin: "24px 0 10px", fontWeight: 600 }}>{children}</h4>;

    if (style === "blockquote") return (
      <blockquote key={idx} style={{ borderLeft: "3px solid #F4500F", margin: "36px 0", padding: "20px 28px", background: "#FFF7F5", borderRadius: "0 8px 8px 0", position: "relative" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "clamp(16px,1.6vw,20px)", color: "#0D0D0D", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>{children}</p>
      </blockquote>
    );

    return (
      <p key={idx} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(15px,1vw,17px)", lineHeight: 1.85, color: "#444", margin: "0 0 22px" }}>
        {children}
      </p>
    );
  };

  const elements  = [];
  let listItems   = [];
  let listType    = null;

  const flushList = (key) => {
    if (!listItems.length) return;
    const Tag = listType === "bullet" ? "ul" : "ol";
    elements.push(
      <Tag key={`list-${key}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(15px,1vw,17px)", lineHeight: 1.85, color: "#555", margin: "20px 0 26px", paddingLeft: 26 }}>
        {listItems.map((li, i) => (
          <li key={i} style={{ marginBottom: 8, paddingLeft: 4 }}>
            {(li.children || []).map((c, ci) => <span key={ci}>{renderSpan(c, li.markDefs || [])}</span>)}
          </li>
        ))}
      </Tag>
    );
    listItems = [];
    listType  = null;
  };

  blocks.forEach((block, idx) => {
    if (block._type === "block" && block.listItem) {
      if (listType && listType !== block.listItem) flushList(idx);
      listType = block.listItem;
      listItems.push(block);
    } else {
      flushList(idx);
      if (block._type === "image") {
        const imgUrl = urlFor(block)?.width(900).url();
        elements.push(
          <figure key={idx} style={{ margin: "44px 0", borderRadius: 10, overflow: "hidden", border: "1px solid #E8E8E8" }}>
            <img src={imgUrl} alt={block.alt || ""} style={{ width: "100%", display: "block", objectFit: "cover" }} />
            {block.caption && (
              <figcaption style={{ padding: "10px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#999", fontStyle: "italic", background: "#FAFAFA", textAlign: "center" }}>
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      } else if (block._type === "code") {
        elements.push(
          <pre key={idx} style={{ background: "#0D0D0D", borderRadius: 8, padding: "22px 24px", overflowX: "auto", margin: "28px 0", fontFamily: "monospace", fontSize: 13, lineHeight: 1.75, color: "#f0f0f0" }}>
            <code>{block.code}</code>
          </pre>
        );
      } else if (block._type === "block") {
        elements.push(renderBlock(block, idx));
      }
    }
  });
  flushList("end");
  return <>{elements}</>;
}

// ─── EXTRACT HEADINGS FOR TOC ─────────────────────────────────────────────────
function extractHeadings(blocks) {
  if (!blocks) return [];
  return blocks
    .filter(b => b._type === "block" && ["h2", "h3"].includes(b.style))
    .map((b) => ({
      id:    `h-${blocks.indexOf(b)}`,
      text:  (b.children || []).map(c => c.text).join(""),
      level: b.style,
    }));
}

// ─── READING PROGRESS BAR ─────────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 9999, background: "#E8E8E8" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "#F4500F", transition: "width 0.1s linear" }} />
    </div>
  );
}

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────
function TableOfContents({ headings, activeId }) {
  if (!headings.length) return null;
  return (
    <nav style={{ position: "sticky", top: 84, maxHeight: "calc(100vh - 120px)", overflowY: "auto", paddingBottom: 20 }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.12em", color: "#aaa", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 16, height: 2, background: "#F4500F", borderRadius: 1 }} />
        Contents
      </div>
      {headings.map((h) => (
        <a key={h.id} href={`#${h.id}`}
          onClick={(e) => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
          style={{
            display: "block",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: h.level === "h2" ? 600 : 400,
            fontSize: h.level === "h2" ? 13 : 12,
            lineHeight: 1.45,
            color: activeId === h.id ? "#F4500F" : "#999",
            textDecoration: "none",
            borderLeft: `2px solid ${activeId === h.id ? "#F4500F" : "#E8E8E8"}`,
            paddingLeft: `${(h.level === "h3" ? 12 : 0) + 12}px`,
            paddingTop: 7, paddingBottom: 7,
            transition: "all 0.18s ease",
          }}
          onMouseEnter={e => { if (activeId !== h.id) e.currentTarget.style.color = "#0D0D0D"; }}
          onMouseLeave={e => { if (activeId !== h.id) e.currentTarget.style.color = "#999"; }}
        >{h.text}</a>
      ))}
    </nav>
  );
}

// ─── RELATED CARD ─────────────────────────────────────────────────────────────
function RelatedCard({ post, onRead }) {
  const [hov, setHov] = useState(false);
  const img  = post.mainImage ? urlFor(post.mainImage).width(600).height(380).fit("crop").url()
    : "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80";
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
  const cat  = post.tag || "General";

  return (
    <article
      onClick={() => onRead && onRead(post.slug)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hov ? "#F4500F" : "#E8E8E8"}`,
        borderRadius: 10, overflow: "hidden", cursor: "pointer",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.25s ease",
      }}>
      <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
        <img src={img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.45s ease" }} />
        <span style={{ position: "absolute", top: 10, left: 10, background: "#F4500F", borderRadius: 100, padding: "3px 10px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.1em", color: "#fff", textTransform: "uppercase" }}>{cat}</span>
      </div>
      <div style={{ padding: "16px 18px 20px" }}>
        <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", lineHeight: 1.35, color: "#0D0D0D", margin: "0 0 8px" }}>{post.title}</h4>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "#aaa" }}>{date}</div>
      </div>
    </article>
  );
}

// ─── SHARE BAR ────────────────────────────────────────────────────────────────
function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", color: "#999", textTransform: "uppercase", marginRight: 4 }}>Share</span>
      {[
        { label: "Twitter",  href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}` },
        { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
      ].map(s => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
          style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 100, padding: "6px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#555", textDecoration: "none", transition: "all 0.18s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#F4500F"; e.currentTarget.style.color = "#F4500F"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.color = "#555"; }}
        >{s.label}</a>
      ))}
      <button onClick={copy}
        style={{ background: copied ? "#F0FAF4" : "#fff", border: `1px solid ${copied ? "#BBF0D0" : "#E8E8E8"}`, borderRadius: 100, padding: "6px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12, color: copied ? "#16a34a" : "#555", cursor: "pointer", transition: "all 0.25s" }}
      >{copied ? "✓ Copied!" : "Copy Link"}</button>
    </div>
  );
}

// ─── FALLBACK BODY ────────────────────────────────────────────────────────────
const FALLBACK_BODY = [
  { _type:"block", style:"normal",     _key:"1",  markDefs:[], children:[{_type:"span",_key:"s1",marks:[],text:"This is a sample post from the Revadoo Rewards Blog. When connected to Sanity CMS, the full article body will appear here with rich text formatting, images, and more."}]},
  { _type:"block", style:"h2",         _key:"2",  markDefs:[], children:[{_type:"span",_key:"s2",marks:[],text:"Getting Started with Rewards"}]},
  { _type:"block", style:"normal",     _key:"3",  markDefs:[], children:[{_type:"span",_key:"s3",marks:[],text:"The Revadoo rewards program is designed to make earning points as simple as possible. Whether you're completing daily tasks, participating in quizzes, or shopping through our partner network, every action brings you closer to your next reward."}]},
  { _type:"block", style:"blockquote", _key:"4",  markDefs:[], children:[{_type:"span",_key:"s4",marks:[],text:"The key to maximizing your earnings is consistency — small daily actions compound into massive rewards over time."}]},
  { _type:"block", style:"h2",         _key:"5",  markDefs:[], children:[{_type:"span",_key:"s5",marks:[],text:"Top Strategies for Power Users"}]},
  { _type:"block", style:"normal",     _key:"6",  markDefs:[], children:[{_type:"span",_key:"s6",marks:["strong"],text:"Daily streaks "},{_type:"span",_key:"s7",marks:[],text:"are the single most impactful multiplier. Maintaining a 7-day streak activates a 3× bonus on all point-earning activities."}]},
  { _type:"block", listItem:"bullet",  _key:"7",  markDefs:[], children:[{_type:"span",_key:"s8",marks:[],text:"Complete the daily quiz every morning before 10 AM for bonus points"}]},
  { _type:"block", listItem:"bullet",  _key:"8",  markDefs:[], children:[{_type:"span",_key:"s9",marks:[],text:"Use the shopping portal for all online purchases to earn cashback points"}]},
  { _type:"block", listItem:"bullet",  _key:"9",  markDefs:[], children:[{_type:"span",_key:"s10",marks:[],text:"Refer friends to unlock milestone bonuses worth up to 5,000 points per referral"}]},
  { _type:"block", style:"h2",         _key:"10", markDefs:[], children:[{_type:"span",_key:"s11",marks:[],text:"Redeeming Your Points"}]},
  { _type:"block", style:"normal",     _key:"11", markDefs:[], children:[{_type:"span",_key:"s12",marks:[],text:"The best redemption value is typically found in major gift cards like Amazon, where your points translate to near-dollar value. Sweepstakes entries offer potential returns of 10–50× when timed correctly."}]},
];

// ─── MAIN BLOGPOST COMPONENT ──────────────────────────────────────────────────
export default function BlogPost({ post: initialPost, onBack, onReadRelated }) {
  const [post,     setPost]     = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    if (initialPost?._isSanity && initialPost.slug) {
      client.fetch(POST_QUERY(initialPost.slug), { slug: initialPost.slug })
        .then(data => { setPost(data || buildFallbackPost(initialPost)); setLoading(false); })
        .catch(()  => { setPost(buildFallbackPost(initialPost));          setLoading(false); });
    } else {
      setTimeout(() => { setPost(buildFallbackPost(initialPost)); setLoading(false); }, 400);
    }
  }, [initialPost?._id]);

  useEffect(() => {
    if (!post) return;
    const headings = document.querySelectorAll("[id^='h-']");
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach(h => obs.observe(h));
    return () => obs.disconnect();
  }, [post, loading]);

  const body         = post?.body || FALLBACK_BODY;
  const headings     = extractHeadings(body);
  const heroImg      = post?.mainImage
    ? urlFor(post.mainImage).width(1400).height(700).fit("crop").url()
    : initialPost?.img || "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80";
  const authorName   = post?.author   || initialPost?.author   || "Revadoo Team";
  const authorAvatar = post?.avatar   ? urlFor(post.avatar).width(100).height(100).fit("crop").url() : null;
  const category     = post?.tag      || initialPost?.category || "General";
  const date         = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : initialPost?.date || "";
  const readTime     = post?.readTime || initialPost?.readTime || "5 min read";
  const related      = post?.relatedPosts || [];

  return (
    <div style={{ background: "#FAFAFA", color: "#0D0D0D", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #F4500F; color: #fff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: #F4500F; border-radius: 2px; }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .skeleton { background:linear-gradient(90deg,#f0f0f0 25%,#e4e4e4 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.4s ease-in-out infinite; }
      `}</style>

      <ReadingProgress />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 2, left: 0, right: 0, zIndex: 100, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: "rgba(250,250,250,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E8E8E8" }}>
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#888", padding: 0, transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#F4500F"}
          onMouseLeave={e => e.currentTarget.style.color = "#888"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Blog
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, background: "#F4500F", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="#fff"/>
              <rect x="8" y="1" width="5" height="5" rx="1" fill="#fff" opacity="0.6"/>
              <rect x="1" y="8" width="5" height="5" rx="1" fill="#fff" opacity="0.6"/>
              <rect x="8" y="8" width="5" height="5" rx="1" fill="#fff"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: "#0D0D0D" }}>Revadoo <span style={{ color: "#F4500F" }}>Blog</span></span>
        </div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#999", fontWeight: 500 }}>
          {readTime}
        </div>
      </nav>

      {/* ── HERO ── */}
      {loading ? (
        <div style={{ marginTop: 62, height: 440 }} className="skeleton" />
      ) : (
        <header style={{ marginTop: 62, position: "relative", height: "clamp(320px,44vw,500px)", overflow: "hidden" }}>
          <img src={heroImg} alt={post?.title || initialPost?.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(250,250,250,1) 0%, rgba(250,250,250,0.4) 50%, rgba(250,250,250,0) 100%)" }} />
        </header>
      )}

      {/* ── ARTICLE HEADER ── */}
      {!loading && (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 48px", animation: "fadeUp 0.5s ease forwards" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: -32, marginBottom: 20, position: "relative", zIndex: 2 }}>
            <span style={{ background: "#F4500F", color: "#fff", borderRadius: 100, padding: "5px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>{category}</span>
            <span style={{ color: "#aaa", fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{date}</span>
            <span style={{ color: "#E0E0E0", fontSize: 12 }}>·</span>
            <span style={{ color: "#aaa", fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{readTime}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(24px,3.8vw,52px)", letterSpacing: "-0.035em", lineHeight: 1.08, color: "#0D0D0D", marginBottom: 24 }}>
            {post?.title || initialPost?.title}
          </h1>
          {(post?.desc || initialPost?.excerpt) && (
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, lineHeight: 1.75, color: "#666", marginBottom: 32 }}>
              {post?.desc || initialPost?.excerpt}
            </p>
          )}
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 260px", gap: 64, alignItems: "start" }}>

        {/* ── ARTICLE ── */}
        <main>
          {/* Author row */}
          {!loading && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 28px", borderBottom: "1px solid #E8E8E8", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #E8E8E8" }} />
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#F4500F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#fff", flexShrink: 0 }}>
                    {authorName[0]}
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#0D0D0D" }}>{authorName}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#aaa", marginTop: 2 }}>{date} · {category}</div>
                </div>
              </div>
              <ShareBar title={post?.title || initialPost?.title || ""} />
            </div>
          )}

          {/* Article body */}
          <div style={{ maxWidth: 680 }}>
            {loading ? (
              <div>
                {[100, 80, 95, 70, 60, 90, 75, 85, 50].map((w, i) => (
                  <div key={i} className="skeleton" style={{ height: i % 4 === 0 ? 24 : 14, borderRadius: 3, marginBottom: 14, width: `${w}%` }} />
                ))}
              </div>
            ) : (
              <PortableTextRenderer blocks={body} />
            )}
          </div>

          {/* Bottom actions */}
          {!loading && (
            <div style={{ marginTop: 64, paddingTop: 28, borderTop: "1px solid #E8E8E8", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <ShareBar title={post?.title || initialPost?.title || ""} />
              <button onClick={onBack}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #E8E8E8", borderRadius: 6, padding: "10px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#555", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#F4500F"; e.currentTarget.style.color = "#F4500F"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.color = "#555"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back to Blog
              </button>
            </div>
          )}

          {/* Related */}
          {!loading && related.length > 0 && (
            <section style={{ marginTop: 72, paddingBottom: 80 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 3, height: 18, background: "#F4500F", borderRadius: 2 }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: "#0D0D0D" }}>Related Articles</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(related.length, 2)}, 1fr)`, gap: 16 }}>
                {related.map(r => <RelatedCard key={r._id} post={r} onRead={onReadRelated} />)}
              </div>
            </section>
          )}

          <div style={{ height: 80 }} />
        </main>

        {/* ── SIDEBAR ── */}
        <aside style={{ paddingTop: 40 }}>
          {!loading && <TableOfContents headings={headings} activeId={activeId} />}

          {/* Author card */}
          {!loading && (
            <div style={{ marginTop: headings.length ? 28 : 0, background: "#fff", border: "1px solid #E8E8E8", borderRadius: 10, padding: "18px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#F4500F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: "#fff", flexShrink: 0 }}>
                    {authorName[0]}
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#0D0D0D" }}>{authorName}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "#F4500F", fontWeight: 600, marginTop: 1 }}>Author</div>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div style={{ marginTop: 16, background: "#0D0D0D", borderRadius: 10, padding: "20px 18px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6 }}>Get weekly tips free</div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 14 }}>
              Join 40,000+ members getting the best reward strategies.
            </p>
            <input
              placeholder="your@email.com"
              style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "9px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: "#fff", outline: "none", marginBottom: 8 }}
            />
            <button
              style={{ width: "100%", background: "#F4500F", border: "none", borderRadius: 6, padding: "10px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => e.target.style.background = "#D93E0C"}
              onMouseLeave={e => e.target.style.background = "#F4500F"}
            >Subscribe →</button>
          </div>

          {/* Share card */}
          {!loading && (
            <div style={{ marginTop: 16, background: "#fff", border: "1px solid #E8E8E8", borderRadius: 10, padding: "16px" }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 12 }}>Share Article</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Share on Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title || "")}&url=${encodeURIComponent(window.location.href)}` },
                  { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", textAlign: "center", background: "#FAFAFA", border: "1px solid #E8E8E8", borderRadius: 6, padding: "8px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#555", textDecoration: "none", transition: "all 0.18s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#F4500F"; e.currentTarget.style.color = "#F4500F"; e.currentTarget.style.background = "#FFF7F5"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "#FAFAFA"; }}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

// ─── HELPER ───────────────────────────────────────────────────────────────────
function buildFallbackPost(card) {
  return {
    _id:          card?.id || "fallback",
    title:        card?.title || "Blog Post",
    body:         FALLBACK_BODY,
    mainImage:    null,
    publishedAt:  null,
    author:       card?.author || "Revadoo Team",
    avatar:       null,
    tag:          card?.category || "General",
    relatedPosts: [],
  };
}