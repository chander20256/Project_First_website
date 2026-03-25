import { useState, useEffect, useRef } from "react";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import BlogPost from "./Blogpost";

// ─── SANITY SETUP ──────────────────────────────────────────────────────────────
const client = createClient({
  projectId:  "os6cjfhs",
  dataset:    "production",
  apiVersion: "2024-01-01",
  useCdn:     false,
  token:      import.meta.env.VITE_SANITY_TOKEN || "",
});
const builder = createImageUrlBuilder(client);
const urlFor  = (src) => src ? builder.image(src) : null;

const QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, title,
  "slug": slug.current,
  desc, mainImage, publishedAt,
  author, avatar,
  tag, tagColor, readTime,
  comingSoon, featured
}`;

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const getImage = (p, w = 800, h = 500) =>
  p.mainImage
    ? urlFor(p.mainImage).width(w).height(h).fit("crop").url()
    : p.img || `https://images.unsplash.com/photo-1551434678-e076c223a692?w=${w}&h=${h}&fit=crop`;

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

// ─── FALLBACK DATA ─────────────────────────────────────────────────────────────
const FALLBACK_POSTS = [
  { id:1,  category:"Getting Started", tag:"Beginner Guide",  title:"How to Earn Your First 1,000 Points in Just 3 Days",                         excerpt:"New to the rewards program? This complete walkthrough shows exactly which tasks to hit first, how to set up your daily streak, and the fastest path to your first real reward redemption.", author:"Riya Sharma",  date:"March 6, 2026",  readTime:"5 min read", img:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",  featured:true,  accent:"#F4500F" },
  { id:2,  category:"Tips & Tricks",   tag:"Power User",      title:"The 7-Day Streak Secret That Triples Your Daily Points",                     excerpt:"Most members miss this one multiplier. Maintaining a 7-day login and search streak quietly stacks a 3× bonus that almost nobody talks about.", author:"James Okafor", date:"March 4, 2026",  readTime:"4 min read", img:"https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80", featured:false, accent:"#F4500F" },
  { id:3,  category:"Redeem",          tag:"Gift Cards",       title:"Amazon vs Xbox vs Starbucks: Which Reward Is Actually Worth It?",           excerpt:"We broke down every major reward option by points-to-value ratio, redemption speed, and real-world usability so you never waste a single point.",  author:"Priya Nair",   date:"March 2, 2026",  readTime:"6 min read", img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",  featured:false, accent:"#F4500F" },
  { id:4,  category:"Quizzes",         tag:"Weekly Challenge", title:"Inside the Daily Quiz: How to Score 100% Every Single Time",                excerpt:"The daily quiz isn't random — it follows patterns. After analyzing 90 days of questions, we found the topics that repeat most.",               author:"Marcus Lee",   date:"Feb 28, 2026",   readTime:"7 min read", img:"https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80", featured:false, accent:"#F4500F" },
  { id:5,  category:"Mobile",          tag:"App Update",       title:"The Mobile App Just Got Faster — And Added 3 New Earning Modes",            excerpt:"The latest update rolls out background task tracking, push-alert quizzes, and a new partner scan feature.",                                    author:"Sneha Kapoor", date:"Feb 25, 2026",   readTime:"4 min read", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", featured:false, accent:"#F4500F" },
  { id:6,  category:"Deep Dive",       tag:"Analysis",         title:"We Tracked 30 Days of Tasks — Here's the Exact Earning Schedule",          excerpt:"We logged every available task across 30 consecutive days and mapped the optimal daily schedule. Spend just 12 minutes a day on this routine.", author:"Riya Sharma",  date:"Feb 22, 2026",   readTime:"9 min read", img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80", featured:false, accent:"#F4500F" },
  { id:7,  category:"Redeem",          tag:"Sweepstakes",      title:"Sweepstakes Entries: The Highest-ROI Way to Spend Your Points?",           excerpt:"Gift cards feel safe, but sweepstakes entries can return 50× the value if you time them right. We dug into the odds and entry strategy.",    author:"James Okafor", date:"Feb 18, 2026",   readTime:"5 min read", img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80", featured:false, accent:"#F4500F" },
  { id:8,  category:"Community",       tag:"Member Story",     title:"How This Member Earned $800 in Gift Cards Last Year Without Spending a Penny", excerpt:"Arjun from Bengaluru turned his daily 15-minute reward routine into $800 of real value across Amazon, Starbucks, and Xbox.",             author:"Priya Nair",   date:"Feb 14, 2026",   readTime:"8 min read", img:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",  featured:false, accent:"#F4500F" },
  { id:9,  category:"Shopping",        tag:"Bonus Points",     title:"Shop & Earn: Every Store That Gives Bonus Points Right Now",               excerpt:"The shopping tab is the most underused earning source in the entire program. This list covers every partner store offering bonus points.",   author:"Marcus Lee",   date:"Feb 10, 2026",   readTime:"6 min read", img:"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80", featured:false, accent:"#F4500F" },
];

// ─── SANITY HOOK ───────────────────────────────────────────────────────────────
function useSanityPosts() {
  const [sanityPosts, setSanityPosts] = useState(null);
  const [error,       setError]       = useState(null);
  const [liveEvent,   setLiveEvent]   = useState(null);
  const subRef = useRef(null);

  useEffect(() => {
    client.fetch(QUERY)
      .then((data) => setSanityPosts(data.length ? data : []))
      .catch((err) => { setError(err.message); setSanityPosts([]); });

    subRef.current = client.listen(QUERY).subscribe({
      next: (update) => {
        setLiveEvent({ type: update.transition, time: new Date().toLocaleTimeString() });
        client.fetch(QUERY).then((data) => setSanityPosts(data.length ? data : []));
      },
      error: (err) => setError(err.message),
    });

    return () => subRef.current?.unsubscribe();
  }, []);

  return { sanityPosts, error, liveEvent };
}

// ─── NORMALIZE SANITY → UNIFIED SHAPE ─────────────────────────────────────────
function normalizeSanity(post, idx) {
  return {
    _isSanity: true,
    id:        post._id,
    slug:      post.slug,
    category:  post.tag || "General",
    tag:       post.tag || "General",
    title:     post.title,
    excerpt:   post.desc || "",
    author:    post.author || "Revadoo Team",
    _avatar:   post.avatar ? urlFor(post.avatar).width(80).height(80).fit("crop").url() : null,
    date:      fmtDate(post.publishedAt),
    readTime:  post.readTime || "3 min read",
    img:       getImage(post),
    featured:  post.featured || idx === 0,
    accent:    "#F4500F",
  };
}

// ─── LIVE TOAST ────────────────────────────────────────────────────────────────
function LiveToast({ event }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!event) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, [event]);
  const labels = { appear: "New post published", update: "Post updated", disappear: "Post removed" };
  return (
    <div style={{
      position: "fixed", bottom: 32, right: 32, zIndex: 9999,
      display: "flex", alignItems: "center", gap: 10,
      background: "#0D0D0D", borderRadius: 6,
      padding: "12px 20px",
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#fff",
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
      opacity: visible ? 1 : 0,
      transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      pointerEvents: "none",
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
      {event ? (labels[event.type] || "Blog updated") : ""}
      {event && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginLeft: 4 }}>{event.time}</span>}
    </div>
  );
}

// ─── SKELETON ─────────────────────────────────────────────────────────────────
function Skeleton({ w = "100%", h = 16, r = 4, mb = 0 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, marginBottom: mb,
      background: "linear-gradient(90deg,#f0f0f0 25%,#e4e4e4 50%,#f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s ease-in-out infinite",
    }} />
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Blog() {
  const { sanityPosts, error, liveEvent } = useSanityPosts();
  const [active,      setActive]      = useState("All");
  const [hovered,     setHovered]     = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

  const loading   = sanityPosts === null;
  const hasSanity = sanityPosts && sanityPosts.length > 0;
  const posts     = hasSanity ? sanityPosts.map(normalizeSanity) : FALLBACK_POSTS;
  const isSanity  = hasSanity;

  const allCats  = ["All", ...new Set(posts.map(p => p.category))];

  // Hero always shows the latest post by publishedAt when from Sanity,
  // otherwise fall back to the first post in the list.
  const latestPost = isSanity
    ? [...posts].sort((a, b) => {
        const da = sanityPosts.find(s => s._id === a.id)?.publishedAt || "";
        const db = sanityPosts.find(s => s._id === b.id)?.publishedAt || "";
        return db.localeCompare(da);
      })[0]
    : posts[0];

  const featured = latestPost || posts[0];
  const rest     = posts.filter(p => p.id !== featured?.id);
  const filtered = active === "All" ? rest : rest.filter(p => p.category === active);

  const openBySlug = (slug) => {
    const found = posts.find(p => p.slug === slug);
    if (found) setCurrentPost(found);
  };

  if (currentPost) {
    return (
      <BlogPost
        post={currentPost}
        onBack={() => { setCurrentPost(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onReadRelated={openBySlug}
      />
    );
  }

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
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .post-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .post-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.1) !important; }
        .post-card img { transition: transform 0.5s ease; }
        .post-card:hover img { transform: scale(1.04); }
        .cat-btn { transition: all 0.18s ease; }
        .read-more { transition: all 0.2s ease; }
        .read-more:hover { color: #F4500F !important; gap: 10px !important; }
        .nav-link { transition: color 0.2s; }
        .nav-link:hover { color: #F4500F !important; }
      `}</style>

      <LiveToast event={liveEvent} />
      {/* ── STATUS BAR ── */}
      {!loading && !isSanity && (
        <div style={{ background: "#FFF7F5", borderBottom: "1px solid #FDDDD5", padding: "8px 48px", textAlign: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#C2400C", fontWeight: 500 }}>
          {error ? `Sanity error: ${error}` : "Showing sample data — publish posts in Sanity Studio to see them here instantly"}
        </div>
      )}

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>

        {/* ── HERO FEATURED ── */}
        <section style={{ padding: "56px 0 48px", borderBottom: "1px solid #E8E8E8" }}>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                <Skeleton w="120px" h={22} r={100} mb={28} />
                <Skeleton w="90%" h={52} r={4} mb={12} />
                <Skeleton w="75%" h={52} r={4} mb={32} />
                <Skeleton w="100%" h={18} r={4} mb={10} />
                <Skeleton w="85%" h={18} r={4} mb={10} />
                <Skeleton w="70%" h={18} r={4} mb={36} />
                <Skeleton w="140px" h={44} r={6} />
              </div>
              <Skeleton w="100%" h={420} r={12} />
            </div>
          ) : featured && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", animation: "fadeIn 0.5s ease forwards" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                  {isSanity && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFF2ED", border: "1px solid #FDDDD5", borderRadius: 100, padding: "4px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, color: "#F4500F", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F4500F", display: "inline-block", animation: "pulse 2s infinite" }} />
                      Latest Post
                    </span>
                  )}
                  <span style={{ background: "#F4500F", color: "#fff", borderRadius: 100, padding: "4px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {featured.category}
                  </span>
                  <span style={{ color: "#999", fontSize: 13 }}>{featured.readTime}</span>
                </div>

                <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(30px,3.2vw,48px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0D0D0D", marginBottom: 20 }}>
                  {featured.title}
                </h1>

                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, lineHeight: 1.75, color: "#666", marginBottom: 36, maxWidth: 480 }}>
                  {featured.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                  {featured._avatar ? (
                    <img src={featured._avatar} alt={featured.author} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid #E8E8E8" }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F4500F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: "#fff", flexShrink: 0 }}>
                      {featured.author[0]}
                    </div>
                  )}
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#0D0D0D" }}>{featured.author}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#999", marginTop: 1 }}>{featured.date}</div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPost(featured)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0D0D0D", color: "#fff", border: "none", borderRadius: 6, padding: "14px 28px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F4500F"}
                  onMouseLeave={e => e.currentTarget.style.background = "#0D0D0D"}
                >
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>

              <div style={{ position: "relative" }}>
                <div
                  onClick={() => setCurrentPost(featured)}
                  style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "4/3", cursor: "pointer", boxShadow: "0 24px 80px rgba(0,0,0,0.12)" }}
                >
                  <img src={featured.img} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                {/* Stat cards */}
                <div style={{ position: "absolute", bottom: -20, left: -24, background: "#fff", border: "1px solid #E8E8E8", borderRadius: 10, padding: "14px 18px", boxShadow: "0 8px 30px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>🔥</span>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#F4500F" }}>7-Day</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "#999" }}>Streak active</div>
                  </div>
                </div>
                <div style={{ position: "absolute", top: -16, right: -16, background: "#F4500F", borderRadius: 10, padding: "12px 16px", boxShadow: "0 8px 30px rgba(244,80,15,0.35)", color: "#fff" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20 }}>+500</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 600, opacity: 0.85 }}>BONUS PTS</div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── STATS BAR ── */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E8E8E8", padding: "20px 0" }}>
          {[["128K+", "Monthly Readers"], [`${posts.length}`, "Articles Published"], ["40K+", "Newsletter Subscribers"], ["4.9★", "Avg. Rating"]].map(([val, label], i) => (
            <div key={label} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? "1px solid #E8E8E8" : "none", padding: "4px 0" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 22, color: "#F4500F" }}>{val}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#999", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── CATEGORY FILTER ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "28px 0 32px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: 8 }}>Filter:</span>
          {allCats.map(cat => (
            <button key={cat} className="cat-btn" onClick={() => setActive(cat)} style={{
              border: "1px solid",
              borderColor: active === cat ? "#F4500F" : "#E8E8E8",
              background: active === cat ? "#F4500F" : "#fff",
              color: active === cat ? "#fff" : "#555",
              borderRadius: 100, padding: "7px 18px",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}>{cat}</button>
          ))}
        </div>

        {/* ── GRID HEADER ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 3, height: 20, background: "#F4500F", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#0D0D0D" }}>
              {active === "All" ? "All Articles" : active}
            </span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: "#999" }}>
              · {filtered.length} {filtered.length === 1 ? "post" : "posts"}
            </span>
          </div>
          {isSanity && (
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#22c55e", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
              Live from Sanity CMS
            </span>
          )}
        </div>

        {/* ── CARD GRID ── */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, paddingBottom: 80 }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #E8E8E8" }}>
                <Skeleton w="100%" h={200} r={0} mb={0} />
                <div style={{ padding: 20 }}>
                  <Skeleton w="60px" h={20} r={100} mb={14} />
                  <Skeleton w="95%" h={16} r={3} mb={8} />
                  <Skeleton w="80%" h={16} r={3} mb={20} />
                  <Skeleton w="100%" h={13} r={3} mb={6} />
                  <Skeleton w="85%" h={13} r={3} mb={6} />
                  <Skeleton w="70%" h={13} r={3} mb={0} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#999", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15 }}>
            No posts in this category yet.
            {isSanity && " Publish one in Sanity Studio — it'll appear here instantly."}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {filtered.map((post) => {
                const isHov = hovered === post.id;
                return (
                  <article
                    key={post.id}
                    className="post-card"
                    onClick={() => setCurrentPost(post)}
                    onMouseEnter={() => setHovered(post.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      background: "#fff", border: "1px solid #E8E8E8",
                      borderRadius: 12, overflow: "hidden", cursor: "pointer",
                      display: "flex", flexDirection: "column",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ height: 200, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                      <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <span style={{ position: "absolute", top: 14, left: 14, background: "#F4500F", color: "#fff", borderRadius: 100, padding: "4px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>{post.tag}</span>
                      <span style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.92)", borderRadius: 100, padding: "4px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 500, color: "#555" }}>{post.readTime}</span>
                    </div>

                    <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 10, color: "#F4500F", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{post.category}</span>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, lineHeight: 1.3, letterSpacing: "-0.01em", color: "#0D0D0D", margin: "0 0 10px" }}>{post.title}</h3>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, lineHeight: 1.7, color: "#888", flex: 1, marginBottom: 20 }}>{post.excerpt}</p>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #F0F0F0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {post._avatar ? (
                            <img src={post._avatar} alt={post.author} style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #E8E8E8" }} />
                          ) : (
                            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#F4500F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 12, color: "#fff", flexShrink: 0 }}>{post.author[0]}</div>
                          )}
                          <div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#0D0D0D" }}>{post.author}</div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "#aaa" }}>{post.date}</div>
                          </div>
                        </div>
                        <span className="read-more" style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12, color: isHov ? "#F4500F" : "#999", transition: "all 0.2s" }}>
                          Read
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: 56, paddingBottom: 80 }}>
              <button
                style={{ background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 6, padding: "13px 40px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#0D0D0D", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#F4500F"; e.currentTarget.style.color = "#F4500F"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.color = "#0D0D0D"; }}
              >
                Load More Articles
              </button>
            </div>
          </>
        )}
      </main>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: "#0D0D0D", padding: "72px 48px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <span style={{ background: "#F4500F", color: "#fff", borderRadius: 100, padding: "5px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-block", marginBottom: 20 }}>Newsletter</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,44px)", letterSpacing: "-0.03em", color: "#fff", margin: "0 0 12px", lineHeight: 1.15 }}>
            New tips every week. <span style={{ color: "#F4500F" }}>Free.</span>
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 36, lineHeight: 1.7 }}>
            Join 40,000+ members getting the best reward strategies delivered to their inbox every week.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input
              placeholder="your@email.com"
              style={{ flex: 1, minWidth: 240, maxWidth: 320, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "13px 18px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: "#fff", outline: "none" }}
            />
            <button
              style={{ background: "#F4500F", border: "none", borderRadius: 6, padding: "13px 28px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
              onMouseEnter={e => e.target.style.background = "#D93E0C"}
              onMouseLeave={e => e.target.style.background = "#F4500F"}
            >
              Subscribe →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "24px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>Revadoo <span style={{ color: "#F4500F" }}>Blog</span></span>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} Revadoo. All rights reserved.</span>
      </footer>
    </div>
  );
}