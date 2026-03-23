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
      <p style={{ color:"rgba(240,237,232,0.55)", fontFamily:"Barlow", fontSize:18, lineHeight:1.9 }}>
        No content available for this post yet.
      </p>
    );
  }

  const renderMark = (text, marks = []) => {
    let node = text;
    if (marks.includes("strong"))
      node = <strong style={{ color:"#f0ede8", fontWeight:700 }}>{node}</strong>;
    if (marks.includes("em"))
      node = <em style={{ fontStyle:"italic", color:"rgba(255,140,80,0.9)" }}>{node}</em>;
    if (marks.includes("code"))
      node = <code style={{ background:"rgba(255,87,34,0.12)", border:"1px solid rgba(255,87,34,0.2)", borderRadius:5, padding:"2px 8px", fontFamily:"monospace", fontSize:"0.88em", color:"#ff7043" }}>{node}</code>;
    if (marks.includes("underline"))
      node = <span style={{ textDecoration:"underline", textDecorationColor:"#ff5722" }}>{node}</span>;
    return node;
  };

  const renderSpan = (span, markDefs = []) => {
    const marks   = span.marks || [];
    const linkMark = marks.find(m => markDefs.find(d => d._key === m && d._type === "link"));
    if (linkMark) {
      const def = markDefs.find(d => d._key === linkMark);
      return (
        <a href={def?.href} target="_blank" rel="noopener noreferrer"
          style={{ color:"#ff7043", textDecoration:"underline", textDecorationColor:"rgba(255,112,67,0.4)", textUnderlineOffset:3, transition:"color 0.2s" }}
          onMouseEnter={e => e.target.style.color = "#ff5722"}
          onMouseLeave={e => e.target.style.color = "#ff7043"}
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

    const headingStyle = {
      fontFamily:"Syne", fontWeight:800, letterSpacing:"-0.03em",
      color:"#f0ede8", lineHeight:1.2, scrollMarginTop:100,
    };

    if (style === "h1") return <h1 key={idx} id={`h-${idx}`} style={{ ...headingStyle, fontSize:"clamp(28px,3.5vw,44px)", margin:"56px 0 20px" }}>{children}</h1>;
    if (style === "h2") return <h2 key={idx} id={`h-${idx}`} style={{ ...headingStyle, fontSize:"clamp(22px,2.8vw,34px)", margin:"48px 0 18px" }}>{children}</h2>;
    if (style === "h3") return <h3 key={idx} id={`h-${idx}`} style={{ ...headingStyle, fontSize:"clamp(18px,2.2vw,26px)", margin:"38px 0 14px", color:"rgba(240,237,232,0.9)" }}>{children}</h3>;
    if (style === "h4") return <h4 key={idx} id={`h-${idx}`} style={{ ...headingStyle, fontSize:"clamp(16px,1.8vw,20px)", margin:"28px 0 12px", color:"rgba(240,237,232,0.8)" }}>{children}</h4>;
    if (style === "blockquote") return (
      <blockquote key={idx} style={{ borderLeft:"3px solid #ff5722", margin:"40px 0", padding:"20px 28px", background:"rgba(255,87,34,0.05)", borderRadius:"0 12px 12px 0", position:"relative" }}>
        <div style={{ position:"absolute", top:16, left:20, fontSize:48, color:"#ff5722", opacity:0.3, fontFamily:"Syne", lineHeight:1 }}>"</div>
        <p style={{ fontFamily:"Syne", fontWeight:600, fontSize:"clamp(17px,1.8vw,22px)", color:"rgba(240,237,232,0.85)", lineHeight:1.65, fontStyle:"italic", margin:0, paddingLeft:24 }}>{children}</p>
      </blockquote>
    );
    return (
      <p key={idx} style={{ fontFamily:"Barlow", fontSize:"clamp(16px,1.1vw,18px)", lineHeight:1.9, color:"rgba(240,237,232,0.7)", margin:"0 0 24px" }}>
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
      <Tag key={`list-${key}`} style={{ fontFamily:"Barlow", fontSize:"clamp(16px,1.1vw,18px)", lineHeight:1.85, color:"rgba(240,237,232,0.65)", margin:"20px 0 28px", paddingLeft:28 }}>
        {listItems.map((li, i) => (
          <li key={i} style={{ marginBottom:10, paddingLeft:6 }}>
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
          <figure key={idx} style={{ margin:"48px -40px", borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.08)" }}>
            <img src={imgUrl} alt={block.alt || ""} style={{ width:"100%", display:"block", objectFit:"cover" }} />
            {block.caption && (
              <figcaption style={{ padding:"12px 20px", fontFamily:"Barlow", fontSize:13, color:"rgba(240,237,232,0.35)", fontStyle:"italic", background:"rgba(0,0,0,0.3)", textAlign:"center" }}>
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      } else if (block._type === "code") {
        elements.push(
          <pre key={idx} style={{ background:"#0d0d0d", border:"1px solid rgba(255,87,34,0.15)", borderRadius:12, padding:"24px 28px", overflowX:"auto", margin:"32px 0", fontFamily:"monospace", fontSize:14, lineHeight:1.75, color:"#ff9067" }}>
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
    .filter(b => b._type === "block" && ["h2","h3"].includes(b.style))
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
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:3, zIndex:9999, background:"rgba(255,255,255,0.06)" }}>
      <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(to right,#ff5722,#ff9800,#ff5722)", transition:"width 0.1s linear", boxShadow:"0 0 12px #ff5722" }} />
    </div>
  );
}

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────
function TableOfContents({ headings, activeId }) {
  if (!headings.length) return null;
  return (
    <nav style={{ position:"sticky", top:100, maxHeight:"calc(100vh - 140px)", overflowY:"auto", padding:"0 0 20px" }}>
      <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:10, letterSpacing:"0.14em", color:"rgba(240,237,232,0.3)", textTransform:"uppercase", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ width:18, height:2, background:"#ff5722" }} /> Contents
      </div>
      {headings.map((h) => (
        <a key={h.id} href={`#${h.id}`}
          onClick={(e) => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior:"smooth", block:"start" }); }}
          style={{
            display:"block",
            fontFamily:"Barlow", fontWeight: h.level === "h2" ? 600 : 400,
            fontSize: h.level === "h2" ? 13 : 12, lineHeight:1.4,
            color: activeId === h.id ? "#ff7043" : "rgba(240,237,232,0.4)",
            textDecoration:"none",
            borderLeft:`2px solid ${activeId === h.id ? "#ff5722" : "rgba(255,255,255,0.08)"}`,
            paddingLeft:`${(h.level === "h3" ? 14 : 0) + 12}px`,
            paddingTop:8, paddingBottom:8,
            transition:"all 0.2s ease",
          }}
          onMouseEnter={e => { if (activeId !== h.id) e.currentTarget.style.color = "rgba(240,237,232,0.7)"; }}
          onMouseLeave={e => { if (activeId !== h.id) e.currentTarget.style.color = "rgba(240,237,232,0.4)"; }}
        >{h.text}</a>
      ))}
    </nav>
  );
}

// ─── RELATED CARD ─────────────────────────────────────────────────────────────
function RelatedCard({ post, onRead }) {
  const [hov, setHov] = useState(false);
  const img = post.mainImage ? urlFor(post.mainImage).width(600).height(380).fit("crop").url()
    : "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80";
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) : "";
  const cat  = post.tag || "General";

  return (
    <article onClick={() => onRead && onRead(post.slug)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background:"#0d0d0d", border:`1px solid ${hov?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.07)"}`,
        borderRadius:18, overflow:"hidden", cursor:"pointer",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.45)" : "0 4px 20px rgba(0,0,0,0.2)",
        transition:"all 0.3s cubic-bezier(.22,.68,0,1.2)",
      }}>
      <div style={{ height:180, overflow:"hidden", position:"relative" }}>
        <img src={img} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover", transform:hov?"scale(1.06)":"scale(1)", transition:"transform 0.5s ease" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.5),transparent)" }} />
        <span style={{ position:"absolute", top:12, left:12, background:"#ff5722", borderRadius:100, padding:"3px 12px", fontFamily:"Syne", fontWeight:700, fontSize:9, letterSpacing:"0.1em", color:"#fff" }}>{cat.toUpperCase()}</span>
      </div>
      <div style={{ padding:"18px 20px 22px" }}>
        <h4 style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, letterSpacing:"-0.02em", lineHeight:1.3, color:"#f0ede8", margin:"0 0 10px" }}>{post.title}</h4>
        <div style={{ fontFamily:"Barlow", fontSize:12, color:"rgba(240,237,232,0.3)" }}>{date}</div>
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
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:11, letterSpacing:"0.12em", color:"rgba(240,237,232,0.3)", textTransform:"uppercase" }}>Share</span>
      {[
        { label:"Twitter",  href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}` },
        { label:"LinkedIn", href:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
      ].map(s => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
          style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:100, padding:"7px 16px", fontFamily:"Barlow", fontWeight:600, fontSize:12, color:"rgba(240,237,232,0.6)", textDecoration:"none", transition:"all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,87,34,0.15)"; e.currentTarget.style.color="#ff7043"; e.currentTarget.style.borderColor="rgba(255,87,34,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.color="rgba(240,237,232,0.6)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}
        >{s.label}</a>
      ))}
      <button onClick={copy}
        style={{ background:copied?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.07)", border:`1px solid ${copied?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.1)"}`, borderRadius:100, padding:"7px 16px", fontFamily:"Barlow", fontWeight:600, fontSize:12, color:copied?"#22c55e":"rgba(240,237,232,0.6)", cursor:"pointer", transition:"all 0.3s" }}
      >{copied ? "✓ Copied!" : "Copy Link"}</button>
    </div>
  );
}

// ─── FALLBACK BODY ────────────────────────────────────────────────────────────
const FALLBACK_BODY = [
  { _type:"block", style:"normal",     _key:"1",  markDefs:[], children:[{_type:"span",_key:"s1",marks:[],text:"This is a sample post from the EarnFlow Rewards Blog. When connected to Sanity CMS, the full article body will appear here with rich text formatting, images, and more."}]},
  { _type:"block", style:"h2",         _key:"2",  markDefs:[], children:[{_type:"span",_key:"s2",marks:[],text:"Getting Started with Rewards"}]},
  { _type:"block", style:"normal",     _key:"3",  markDefs:[], children:[{_type:"span",_key:"s3",marks:[],text:"The EarnFlow rewards program is designed to make earning points as simple as possible. Whether you're completing daily tasks, participating in quizzes, or shopping through our partner network, every action brings you closer to your next reward."}]},
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
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeId,setActiveId]= useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top:0, behavior:"smooth" });
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
      { rootMargin:"-20% 0px -70% 0px" }
    );
    headings.forEach(h => obs.observe(h));
    return () => obs.disconnect();
  }, [post, loading]);

  const body         = post?.body || FALLBACK_BODY;
  const headings     = extractHeadings(body);
  const heroImg      = post?.mainImage
    ? urlFor(post.mainImage).width(1400).height(700).fit("crop").url()
    : initialPost?.img || "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80";
  const authorName   = post?.author   || initialPost?.author   || "EarnFlow Team";
  const authorAvatar = post?.avatar   ? urlFor(post.avatar).width(100).height(100).fit("crop").url() : null;
  const category     = post?.tag      || initialPost?.category || "General";
  const date         = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })
    : initialPost?.date || "";
  const readTime     = post?.readTime || initialPost?.readTime || "5 min read";
  const related      = post?.relatedPosts || [];

  return (
    <div style={{ background:"#0a0a0a", color:"#f0ede8", minHeight:"100vh", fontFamily:"Syne, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #ff5722; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #ff5722; border-radius: 2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
        .skeleton { background:linear-gradient(90deg,#1a1a1a 25%,#222 50%,#1a1a1a 75%); background-size:200% 100%; animation:shimmer 1.4s ease-in-out infinite; }
        .animate-up { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      <ReadingProgress />

      {/* NAV */}
      <nav style={{ position:"fixed", top:3, left:0, right:0, zIndex:100, padding:"0 48px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(10,10,10,0.85)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={onBack}
          style={{ display:"flex", alignItems:"center", gap:8, background:"transparent", border:"none", cursor:"pointer", fontFamily:"Syne", fontWeight:700, fontSize:13, color:"rgba(240,237,232,0.5)", letterSpacing:"0.06em", transition:"color 0.2s", padding:0 }}
          onMouseEnter={e => e.currentTarget.style.color = "#ff7043"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(240,237,232,0.5)"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Blog
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#ff5722", boxShadow:"0 0 10px #ff5722" }} />
          <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:12, letterSpacing:"0.12em", color:"rgba(240,237,232,0.4)", textTransform:"uppercase" }}>Rewards Blog</span>
        </div>
        <div style={{ fontFamily:"Barlow", fontSize:12, color:"rgba(240,237,232,0.3)" }}>{readTime}</div>
      </nav>

      {/* HERO */}
      {loading ? (
        <div style={{ marginTop:67, height:540 }} className="skeleton" />
      ) : (
        <header style={{ marginTop:67, position:"relative", height:"clamp(380px,52vw,580px)", overflow:"hidden" }}>
          <img src={heroImg} alt={post?.title || initialPost?.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,10,10,1) 0%,rgba(10,10,10,0.7) 40%,rgba(10,10,10,0.2) 100%)" }} />
          <div style={{ position:"absolute", bottom:-60, left:"50%", transform:"translateX(-50%)", width:500, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,87,34,0.2) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 48px 52px", maxWidth:1100, margin:"0 auto" }}>
            <div className="animate-up" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(255,87,34,0.12)", border:"1px solid rgba(255,87,34,0.25)", borderRadius:100, padding:"6px 16px", marginBottom:20 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#ff5722", boxShadow:"0 0 8px #ff5722" }} />
              <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:10, letterSpacing:"0.14em", color:"#ff7043", textTransform:"uppercase" }}>{category}</span>
              <span style={{ width:1, height:12, background:"rgba(255,255,255,0.15)" }} />
              <span style={{ fontFamily:"Barlow", fontSize:11, color:"rgba(240,237,232,0.5)" }}>{date}</span>
              <span style={{ width:1, height:12, background:"rgba(255,255,255,0.15)" }} />
              <span style={{ fontFamily:"Barlow", fontSize:11, color:"rgba(240,237,232,0.5)" }}>{readTime}</span>
            </div>
            <h1 className="animate-up" style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(26px,4vw,54px)", letterSpacing:"-0.04em", lineHeight:1.08, maxWidth:800, animationDelay:"0.08s", opacity:0 }}>
              {post?.title || initialPost?.title}
            </h1>
          </div>
        </header>
      )}

      {/* MAIN LAYOUT */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", display:"grid", gridTemplateColumns:"1fr 260px", gap:64, alignItems:"start" }}>

        {/* ARTICLE */}
        <main>
          {!loading && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"32px 0", borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:48, flexWrap:"wrap", gap:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} style={{ width:52, height:52, borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(255,87,34,0.35)" }} />
                ) : (
                  <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,#ff5722,#ff9800)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne", fontWeight:800, fontSize:20, flexShrink:0, boxShadow:"0 0 20px rgba(255,87,34,0.3)" }}>
                    {authorName[0]}
                  </div>
                )}
                <div>
                  <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:15 }}>{authorName}</div>
                  <div style={{ fontFamily:"Barlow", fontSize:12, color:"rgba(240,237,232,0.4)", marginTop:3 }}>{date} · {category}</div>
                </div>
              </div>
              <ShareBar title={post?.title || initialPost?.title || ""} />
            </div>
          )}

          {/* BODY */}
          <div ref={contentRef} style={{ maxWidth:680 }}>
            {loading ? (
              <div>
                {[100,80,95,70,60,90,75,85,50].map((w,i) => (
                  <div key={i} className="skeleton" style={{ height: i%4===0?28:14, borderRadius:4, marginBottom:16, width:`${w}%` }} />
                ))}
              </div>
            ) : (
              <PortableTextRenderer blocks={body} />
            )}
          </div>

          {/* BOTTOM BAR */}
          {!loading && (
            <div style={{ marginTop:72, paddingTop:32, borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
              <ShareBar title={post?.title || initialPost?.title || ""} />
              <button onClick={onBack}
                style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:100, padding:"11px 24px", fontFamily:"Syne", fontWeight:700, fontSize:13, color:"rgba(240,237,232,0.7)", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,87,34,0.12)"; e.currentTarget.style.borderColor="rgba(255,87,34,0.3)"; e.currentTarget.style.color="#ff7043"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(240,237,232,0.7)"; }}
              >← Back to Blog</button>
            </div>
          )}

          {/* RELATED */}
          {!loading && related.length > 0 && (
            <section style={{ marginTop:80 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32 }}>
                <div style={{ width:24, height:2, background:"#ff5722" }} />
                <h3 style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, letterSpacing:"-0.02em" }}>Related Articles</h3>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:`repeat(${Math.min(related.length,2)},1fr)`, gap:20 }}>
                {related.map(r => <RelatedCard key={r._id} post={r} onRead={onReadRelated} />)}
              </div>
            </section>
          )}

          <div style={{ height:100 }} />
        </main>

        {/* SIDEBAR */}
        <aside style={{ paddingTop:48 }}>
          {!loading && <TableOfContents headings={headings} activeId={activeId} />}

          {/* Author card */}
          {!loading && (
            <div style={{ marginTop:40, background:"rgba(255,87,34,0.05)", border:"1px solid rgba(255,87,34,0.12)", borderRadius:16, padding:"22px 20px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} style={{ width:42, height:42, borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />
                ) : (
                  <div style={{ width:42, height:42, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#ff5722,#ff9800)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne", fontWeight:800, fontSize:16 }}>
                    {authorName[0]}
                  </div>
                )}
                <div>
                  <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:13 }}>{authorName}</div>
                  <div style={{ fontFamily:"Barlow", fontSize:11, color:"#ff7043", marginTop:2 }}>Author</div>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div style={{ marginTop:28, background:"#0d0d0d", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"22px 20px" }}>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:15, marginBottom:8 }}>Get weekly tips free</div>
            <p style={{ fontFamily:"Barlow", fontSize:12, color:"rgba(240,237,232,0.45)", lineHeight:1.6, marginBottom:16 }}>Join 40,000+ members getting the best reward strategies.</p>
            <input placeholder="your@email.com"
              style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 14px", fontFamily:"Barlow", fontSize:13, color:"#f0ede8", outline:"none", marginBottom:10 }}
            />
            <button
              style={{ width:"100%", background:"#ff5722", border:"none", borderRadius:10, padding:"11px", fontFamily:"Syne", fontWeight:700, fontSize:13, color:"#fff", cursor:"pointer", transition:"background 0.2s" }}
              onMouseEnter={e => e.target.style.background = "#ff3d00"}
              onMouseLeave={e => e.target.style.background = "#ff5722"}
            >Subscribe →</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── HELPER ───────────────────────────────────────────────────────────────────
function buildFallbackPost(card) {
  return {
    _id:         card?.id || "fallback",
    title:       card?.title || "Blog Post",
    body:        FALLBACK_BODY,
    mainImage:   null,
    publishedAt: null,
    author:      card?.author || "EarnFlow Team",
    avatar:      null,
    tag:         card?.category || "General",
    relatedPosts:[],
  };
}