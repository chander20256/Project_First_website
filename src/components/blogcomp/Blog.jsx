import { useState, useEffect, useRef } from "react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import BlogPost from "./Blogpost";

// ─── SANITY SETUP ──────────────────────────────────────────────────────────────
const client = createClient({
  projectId:  "os6cjfhs",
  dataset:    "production",
  apiVersion: "2024-01-01",
  useCdn:     false,
  token:      import.meta.env.VITE_SANITY_TOKEN || "",
});
const builder = imageUrlBuilder(client);
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
  { id:1, category:"Getting Started", tag:"Beginner Guide",  title:"How to Earn Your First 1,000 Points in Just 3 Days",            excerpt:"New to the rewards program? This complete walkthrough shows exactly which tasks to hit first, how to set up your daily streak, and the fastest path to your first real reward redemption.", author:"Riya Sharma",  date:"March 6, 2026",  readTime:"5 min read", img:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",  featured:true,  accent:"#ff5722" },
  { id:2, category:"Tips & Tricks",   tag:"Power User",      title:"The 7-Day Streak Secret That Triples Your Daily Points",         excerpt:"Most members miss this one multiplier. Maintaining a 7-day login and search streak quietly stacks a 3× bonus that almost nobody talks about. Here's how to never break it.", author:"James Okafor", date:"March 4, 2026",  readTime:"4 min read", img:"https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80", featured:false, accent:"#ff7043" },
  { id:3, category:"Redeem",          tag:"Gift Cards",       title:"Amazon vs Xbox vs Starbucks: Which Reward Is Actually Worth It?", excerpt:"We broke down every major reward option by points-to-value ratio, redemption speed, and real-world usability so you never waste a single point on a low-value trade-in again.", author:"Priya Nair",   date:"March 2, 2026",  readTime:"6 min read", img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",  featured:false, accent:"#e64a19" },
  { id:4, category:"Quizzes",         tag:"Weekly Challenge", title:"Inside the Daily Quiz: How to Score 100% Every Single Time",    excerpt:"The daily quiz isn't random — it follows patterns. After analyzing 90 days of questions, we found the topics that repeat most, the trick answers to watch out for, and the best time of day to attempt them.", author:"Marcus Lee",   date:"Feb 28, 2026",   readTime:"7 min read", img:"https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80", featured:false, accent:"#ff5722" },
  { id:5, category:"Mobile",          tag:"App Update",       title:"The Mobile App Just Got Faster — And Added 3 New Earning Modes", excerpt:"The latest update rolls out background task tracking, push-alert quizzes, and a new partner scan feature. Here's every new thing you can do to earn more on your phone starting today.", author:"Sneha Kapoor", date:"Feb 25, 2026",   readTime:"4 min read", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", featured:false, accent:"#ff7043" },
  { id:6, category:"Deep Dive",       tag:"Analysis",         title:"We Tracked 30 Days of Tasks — Here's the Exact Earning Schedule",excerpt:"We logged every available task across 30 consecutive days and mapped the optimal daily schedule. Spend just 12 minutes a day on this exact routine to max out your monthly points cap.", author:"Riya Sharma",  date:"Feb 22, 2026",   readTime:"9 min read", img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80", featured:false, accent:"#e64a19" },
  { id:7, category:"Redeem",          tag:"Sweepstakes",      title:"Sweepstakes Entries: The Highest-ROI Way to Spend Your Points?", excerpt:"Gift cards feel safe, but sweepstakes entries can return 50× the value if you time them right. We dug into the odds, prize history, and entry strategy that maximizes your shot at big wins.", author:"James Okafor", date:"Feb 18, 2026",   readTime:"5 min read", img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80", featured:false, accent:"#ff5722" },
  { id:8, category:"Community",       tag:"Member Story",     title:"How This Member Earned $800 in Gift Cards Last Year Without Spending a Penny", excerpt:"Arjun from Bengaluru turned his daily 15-minute reward routine into $800 of real value across Amazon, Starbucks, and Xbox. He breaks down every single habit in this exclusive interview.", author:"Priya Nair",   date:"Feb 14, 2026",   readTime:"8 min read", img:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",  featured:false, accent:"#ff7043" },
  { id:9, category:"Shopping",        tag:"Bonus Points",     title:"Shop & Earn: Every Store That Gives Bonus Points Right Now",    excerpt:"The shopping tab is the most underused earning source in the entire program. This updated list covers every partner store currently offering bonus points, and how to stack them with existing discounts.", author:"Marcus Lee",   date:"Feb 10, 2026",   readTime:"6 min read", img:"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80", featured:false, accent:"#e64a19" },
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
    author:    post.author || "EarnFlow Team",
    _avatar:   post.avatar ? urlFor(post.avatar).width(80).height(80).fit("crop").url() : null,
    date:      fmtDate(post.publishedAt),
    readTime:  post.readTime || "3 min read",
    img:       getImage(post),
    featured:  post.featured || idx === 0,
    accent:    post.tagColor || "#ff5722",
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
  const labels = { appear: "✦ New post published", update: "↻ Post updated", disappear: "✕ Post removed" };
  return (
    <div style={{
      position:"fixed", bottom:28, right:28, zIndex:9999,
      display:"flex", alignItems:"center", gap:10,
      background:"#111", border:"1px solid rgba(255,87,34,0.5)", borderRadius:100,
      padding:"10px 20px", fontFamily:"Syne", fontWeight:700, fontSize:12, color:"#ff5722",
      letterSpacing:"0.06em", boxShadow:"0 8px 32px rgba(0,0,0,0.6)",
      transform: visible ? "translateY(0)" : "translateY(80px)",
      opacity:   visible ? 1 : 0,
      transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      pointerEvents:"none",
    }}>
      <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", flexShrink:0 }} />
      {event ? (labels[event.type] || "Blog updated") : ""}
      {event && <span style={{ color:"rgba(255,255,255,0.3)", fontSize:11, marginLeft:4 }}>{event.time}</span>}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Blog() {
  const { sanityPosts, error, liveEvent } = useSanityPosts();
  const [active,      setActive]      = useState("All");
  const [hovered,     setHovered]     = useState(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [currentPost, setCurrentPost] = useState(null);
  const riyaRef = useRef(null);

  const loading   = sanityPosts === null;
  const hasSanity = sanityPosts && sanityPosts.length > 0;
  const posts     = hasSanity ? sanityPosts.map(normalizeSanity) : FALLBACK_POSTS;
  const isSanity  = hasSanity;

  const allCats  = ["All", ...new Set(posts.map(p => p.category))];
  const featured = posts[0];
  const rest     = posts.slice(1);
  const filtered = active === "All" ? rest : rest.filter(p => p.category === active);

  const openBySlug = (slug) => {
    const found = posts.find(p => p.slug === slug);
    if (found) setCurrentPost(found);
  };

  useEffect(() => {
    if (currentPost) return;
    const onScroll = () => {
      if (!riyaRef.current) return;
      const rect  = riyaRef.current.getBoundingClientRect();
      const start = window.innerHeight * 0.5;
      const ratio = Math.min(1, Math.max(0, (start - rect.top) / 300));
      setScrollRatio(ratio);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPost]);

  if (currentPost) {
    return (
      <BlogPost
        post={currentPost}
        onBack={() => { setCurrentPost(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onReadRelated={openBySlug}
      />
    );
  }

  const lerp    = (a, b, t) => Math.round(a + (b - a) * t);
  const cardsBg = `rgb(${lerp(10,255,scrollRatio)},${lerp(10,255,scrollRatio)},${lerp(10,255,scrollRatio)})`;
  const textIsDark = scrollRatio > 0.5;

  return (
    <div style={{ fontFamily:"'Syne', sans-serif", background:cardsBg, color:textIsDark?"#0a0a0a":"#f0ede8", minHeight:"100vh", transition:"color 0.3s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #ff5722; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #ff5722; border-radius: 2px; }
        .img-scale { overflow: hidden; }
        .img-scale img { transition: transform 0.6s cubic-bezier(.22,.68,0,1.2); }
        .img-scale:hover img { transform: scale(1.07); }
        .cat-pill { transition: all 0.2s ease; cursor: pointer; }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
        .skeleton { background:linear-gradient(90deg,#1a1a1a 25%,#222 50%,#1a1a1a 75%); background-size:200% 100%; animation:shimmer 1.4s ease-in-out infinite; }
        .read-btn { transition: all 0.25s ease !important; }
        .read-btn:hover { background: #ff3d00 !important; transform: scale(1.04) !important; }
      `}</style>

      <LiveToast event={liveEvent} />

      {/* STATUS BAR */}
      {!loading && (isSanity ? (
        <div style={{ background:"rgba(34,197,94,0.08)", borderBottom:"1px solid rgba(34,197,94,0.15)", padding:"7px 56px", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"Barlow", fontSize:12, color:"#22c55e", letterSpacing:"0.08em" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", animation:"pulse-dot 2s infinite" }} />
          CONNECTED TO SANITY CMS · REAL-TIME ACTIVE · {posts.length} POSTS LOADED
        </div>
      ) : (
        <div style={{ background:"rgba(255,87,34,0.08)", borderBottom:"1px solid rgba(255,87,34,0.15)", padding:"7px 56px", textAlign:"center", fontFamily:"Barlow", fontSize:12, color:"#ff7043", letterSpacing:"0.08em" }}>
          {error ? `❌ SANITY ERROR: ${error}` : "⚠ SHOWING FALLBACK DATA — Publish posts in Sanity Studio and they'll appear here instantly"}
        </div>
      ))}

      {/* HERO */}
      <section style={{ position:"relative", overflow:"hidden", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <div style={{ position:"absolute", top:-120, left:-120, width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,87,34,0.18) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:80, right:-200, width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,61,0,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-100, left:"40%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,120,34,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />

        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"32px 56px", position:"relative", zIndex:2, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#ff5722", boxShadow:"0 0 12px #ff5722" }} />
            <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:13, letterSpacing:"0.12em", color:"rgba(255,255,255,0.5)", textTransform:"uppercase" }}>Rewards Blog</span>
          </div>
          <div style={{ display:"flex", gap:32 }}>
            {[`${posts.length} Articles`, isSanity ? "Live · Sanity CMS" : "4 Authors", "Updated Weekly"].map((s,i) => (
              <span key={i} style={{ fontFamily:"Barlow", fontSize:12, color: i===1 && isSanity ? "#22c55e" : "rgba(255,255,255,0.3)", letterSpacing:"0.06em" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Featured */}
        {loading ? (
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 56px" }}>
            <div className="skeleton" style={{ width:"100%", maxWidth:1100, height:460, borderRadius:24 }} />
          </div>
        ) : featured && (
          <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", padding:"0 56px", position:"relative", zIndex:2, maxWidth:1280, width:"100%", margin:"0 auto", alignItems:"center" }}>
            <div style={{ paddingRight:60, paddingTop:40, paddingBottom:60 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1px solid rgba(255,87,34,0.3)", borderRadius:100, padding:"7px 18px", marginBottom:36, background:"rgba(255,87,34,0.07)", backdropFilter:"blur(8px)" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#ff5722", display:"inline-block", boxShadow:"0 0 8px #ff5722" }} />
                <span style={{ fontFamily:"Barlow", fontWeight:600, fontSize:12, color:"#ff7043", letterSpacing:"0.14em", textTransform:"uppercase" }}>{isSanity ? "Latest · Live from Sanity" : "Featured Article"}</span>
                <span style={{ fontFamily:"Barlow", fontSize:12, color:"rgba(255,255,255,0.35)" }}>{featured.readTime}</span>
              </div>

              <h1 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(36px,4.5vw,64px)", letterSpacing:"-0.04em", lineHeight:1.05, margin:"0 0 28px" }}>
                {featured.title.split(" ").slice(0,4).join(" ")}{" "}
                <span style={{ WebkitTextStroke:"1.5px rgba(255,87,34,0.7)", WebkitTextFillColor:"transparent" }}>
                  {featured.title.split(" ").slice(4).join(" ")}
                </span>
              </h1>

              <p style={{ fontFamily:"Barlow", fontWeight:400, fontSize:17, lineHeight:1.8, color:"rgba(240,237,232,0.5)", marginBottom:40, maxWidth:480 }}>{featured.excerpt}</p>

              <div style={{ display:"flex", alignItems:"center", gap:16, paddingBottom:40, borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:40 }}>
                {featured._avatar ? (
                  <img src={featured._avatar} alt={featured.author} style={{ width:44, height:44, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"2px solid rgba(255,87,34,0.4)" }} />
                ) : (
                  <div style={{ width:44, height:44, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#ff5722,#ff9800)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne", fontWeight:800, fontSize:16, boxShadow:"0 0 20px rgba(255,87,34,0.4)" }}>
                    {featured.author[0]}
                  </div>
                )}
                <div>
                  <div ref={riyaRef} style={{ fontFamily:"Syne", fontWeight:700, fontSize:14 }}>{featured.author}</div>
                  <div style={{ fontFamily:"Barlow", fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:2 }}>{featured.date} · {featured.category}</div>
                </div>
                <button className="read-btn" onClick={() => setCurrentPost(featured)}
                  style={{ marginLeft:"auto", background:"#ff5722", border:"none", borderRadius:100, padding:"13px 30px", color:"#fff", fontFamily:"Syne", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:8, boxShadow:"0 8px 32px rgba(255,87,34,0.4)" }}>
                  Read Article <span style={{ fontSize:16 }}>→</span>
                </button>
              </div>

              <div style={{ display:"flex", gap:36 }}>
                {[["128K+","Monthly Readers"],[`${posts.length}`,"Articles"],["40K+","Newsletter Subs"]].map(([val,label]) => (
                  <div key={label}>
                    <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:22, color:"#ff5722" }}>{val}</div>
                    <div style={{ fontFamily:"Barlow", fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position:"relative", height:620, paddingTop:40, paddingBottom:40 }}>
              <div className="img-scale" onClick={() => setCurrentPost(featured)}
                style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:"88%", height:"82%", borderRadius:24, overflow:"hidden", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 40px 120px rgba(0,0,0,0.7)", cursor:"pointer" }}>
                <img src={featured.img} alt={featured.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(10,10,10,0.4) 0%,transparent 60%)" }} />
                <div style={{ position:"absolute", top:20, left:20, background:"#ff5722", borderRadius:100, padding:"5px 16px", fontFamily:"Syne", fontWeight:700, fontSize:10, letterSpacing:"0.14em" }}>
                  {isSanity ? featured.category.toUpperCase() : "FEATURED"}
                </div>
                <div style={{ position:"absolute", inset:0, background:"rgba(255,87,34,0)", transition:"background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,87,34,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,87,34,0)"} />
              </div>

              <div style={{ position:"absolute", left:-10, top:"8%", background:"rgba(17,17,17,0.92)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"14px 18px", boxShadow:"0 20px 60px rgba(0,0,0,0.5)", zIndex:3, minWidth:170 }}>
                <div style={{ fontFamily:"Barlow", fontSize:10, color:"rgba(255,255,255,0.35)", marginBottom:6, letterSpacing:"0.1em", textTransform:"uppercase" }}>Today's Streak</div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:20 }}>🔥</span>
                  <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:24, color:"#ff5722" }}>7 Days</span>
                </div>
                <div style={{ marginTop:8, height:4, borderRadius:2, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
                  <div style={{ width:"70%", height:"100%", background:"linear-gradient(to right,#ff5722,#ff9800)", borderRadius:2 }} />
                </div>
              </div>

              <div style={{ position:"absolute", left:-20, bottom:"10%", background:"rgba(17,17,17,0.92)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,87,34,0.2)", borderRadius:16, padding:"14px 20px", boxShadow:"0 20px 60px rgba(0,0,0,0.5)", zIndex:3 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#ff5722,#ff9800)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏆</div>
                  <div>
                    <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:15 }}>+500 pts</div>
                    <div style={{ fontFamily:"Barlow", fontSize:11, color:"rgba(255,255,255,0.35)" }}>Weekly bonus unlocked</div>
                  </div>
                </div>
              </div>

              {posts[1] && (
                <div className="img-scale" onClick={() => setCurrentPost(posts[1])} style={{ position:"absolute", right:-16, top:"6%", width:120, height:120, borderRadius:18, overflow:"hidden", border:"2px solid rgba(255,255,255,0.08)", boxShadow:"0 16px 48px rgba(0,0,0,0.6)", zIndex:4, cursor:"pointer" }}>
                  <img src={posts[1].img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"grayscale(40%)" }} />
                </div>
              )}
              {posts[2] && (
                <div className="img-scale" onClick={() => setCurrentPost(posts[2])} style={{ position:"absolute", right:-16, bottom:"8%", width:100, height:100, borderRadius:16, overflow:"hidden", border:"2px solid rgba(255,255,255,0.06)", boxShadow:"0 16px 48px rgba(0,0,0,0.6)", zIndex:4, cursor:"pointer" }}>
                  <img src={posts[2].img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"grayscale(40%)" }} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ticker */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,87,34,0.04)", overflow:"hidden", whiteSpace:"nowrap", position:"relative", zIndex:2 }}>
          <div style={{ display:"inline-flex", gap:0, animation:"ticker 22s linear infinite" }}>
            {[...Array(3)].map((_,rep) => (
              <span key={rep} style={{ display:"inline-flex", alignItems:"center" }}>
                {allCats.filter(c=>c!=="All").map((t,i) => (
                  <span key={i} style={{ display:"inline-flex", alignItems:"center" }}>
                    <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:11, letterSpacing:"0.1em", color:"rgba(247,14,14,0.25)", padding:"14px 28px", textTransform:"uppercase" }}>{t}</span>
                    <span style={{ color:"#ff5722", opacity:0.4, fontSize:8 }}>◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div style={{ padding:"28px 56px", display:"flex", gap:10, flexWrap:"wrap", position:"relative", zIndex:2, maxWidth:1280, margin:"0 auto", width:"100%" }}>
          {allCats.map(cat => (
            <button key={cat} className="cat-pill" onClick={() => setActive(cat)} style={{
              border:     active===cat ? "none" : "1px solid rgba(0,0,0,0.2)",
              background: active===cat ? "#ff5722" : "transparent",
              color:      active===cat ? "#fff" : "rgba(35,4,4,0.4)",
              borderRadius:100, padding:"9px 22px",
              fontFamily:"Syne", fontWeight:700, fontSize:12, letterSpacing:"0.04em", cursor:"pointer",
              boxShadow: active===cat ? "0 4px 20px rgba(255,87,34,0.35)" : "none",
            }}>{cat}</button>
          ))}
        </div>
      </section>

      {/* CARD GRID */}
      <div style={{ padding:"48px 56px 120px", maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:32 }}>
          <div style={{ width:24, height:2, background:"#ff5722" }} />
          <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:11, letterSpacing:"0.12em", color:"rgba(0,0,0,0.4)", textTransform:"uppercase" }}>
            {isSanity ? `${filtered.length} Posts · Live from Sanity` : "All Articles · Fallback Data"}
          </span>
          {isSanity && <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", animation:"pulse-dot 2s infinite" }} />}
        </div>

        {loading && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{ borderRadius:20, overflow:"hidden" }}>
                <div className="skeleton" style={{ height:210 }} />
                <div style={{ background:"#111", padding:24 }}>
                  {[40,90,70,100,60].map((w,j) => (
                    <div key={j} className="skeleton" style={{ height:12, borderRadius:4, marginBottom:12, width:`${w}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"80px 0", fontFamily:"Barlow", fontSize:16, opacity:0.35 }}>
            No posts in this category yet.{isSanity && " Publish one in Sanity Studio — it'll appear here instantly."}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
            {filtered.map((post) => {
              const isHov = hovered === post.id;
              return (
                <article key={post.id} onClick={() => setCurrentPost(post)}
                  onMouseEnter={() => setHovered(post.id)} onMouseLeave={() => setHovered(null)}
                  style={{
                    background:"#0a0a0a", border:`1px solid ${isHov?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.08)"}`,
                    borderRadius:20, overflow:"hidden", cursor:"pointer", display:"flex", flexDirection:"column",
                    transform: isHov ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: isHov ? "0 24px 60px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.15)",
                    transition:"all 0.35s cubic-bezier(.22,.68,0,1.2)",
                  }}>
                  <div style={{ height:210, overflow:"hidden", position:"relative", flexShrink:0 }}>
                    <img src={post.img} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:isHov?"scale(1.06)":"scale(1)", transition:"transform 0.55s cubic-bezier(.22,.68,0,1.2)" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)" }} />
                    <span style={{ position:"absolute", top:14, left:14, background:post.accent, borderRadius:100, padding:"4px 14px", fontFamily:"Syne", fontWeight:700, fontSize:10, letterSpacing:"0.08em", color:"#fff" }}>{post.tag}</span>
                    <span style={{ position:"absolute", top:14, right:14, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(6px)", borderRadius:100, padding:"4px 12px", fontFamily:"Barlow", fontSize:11, color:"rgba(255,255,255,0.8)" }}>{post.readTime}</span>
                  </div>
                  <div style={{ padding:"24px 24px 28px", flex:1, display:"flex", flexDirection:"column" }}>
                    <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:10, color:post.accent, letterSpacing:"0.14em", textTransform:"uppercase", display:"block", marginBottom:10 }}>{post.category}</span>
                    <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:18, letterSpacing:"-0.02em", lineHeight:1.3, margin:"0 0 12px", color:"#fff" }}>{post.title}</h3>
                    <p style={{ fontFamily:"Barlow", fontSize:14, lineHeight:1.75, color:"rgba(255,255,255,0.55)", flex:1, marginBottom:24 }}>{post.excerpt}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:18 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        {post._avatar ? (
                          <img src={post._avatar} alt={post.author} style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:`2px solid ${post.accent}50` }} />
                        ) : (
                          <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, background:`linear-gradient(135deg,${post.accent},#ff9800)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne", fontWeight:800, fontSize:12, color:"#fff" }}>{post.author[0]}</div>
                        )}
                        <div>
                          <div style={{ fontFamily:"Barlow", fontWeight:600, fontSize:13, color:"#fff" }}>{post.author}</div>
                          <div style={{ fontFamily:"Barlow", fontSize:11, color:"rgba(255,255,255,0.4)" }}>{post.date}</div>
                        </div>
                      </div>
                      <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:13, color:isHov?"#fff":post.accent, transition:"color 0.2s" }}>Read →</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div style={{ textAlign:"center", marginTop:64 }}>
            <button
              style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:100, padding:"14px 52px", fontFamily:"Syne", fontWeight:700, fontSize:14, color:"#fff", cursor:"pointer", transition:"all 0.25s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#ff5722"; e.currentTarget.style.borderColor="#ff5722"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}
            >Load More Articles</button>
          </div>
        )}
      </div>

      {/* NEWSLETTER */}
      <div style={{ margin:"0 56px 80px", background:"linear-gradient(125deg,#ff5722 0%,#ff3d00 60%,#bf360c 100%)", borderRadius:24, padding:"60px 60px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:32, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-60, top:-60, width:280, height:280, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h3 style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(24px,3vw,38px)", letterSpacing:"-0.03em", margin:"0 0 10px" }}>New tips every week. Free.</h3>
          <p style={{ fontFamily:"Barlow", fontSize:15, opacity:0.8, margin:0 }}>Join 40,000+ members getting the best reward strategies in their inbox.</p>
        </div>
        <div style={{ display:"flex", gap:12, zIndex:1, flexWrap:"wrap" }}>
          <input placeholder="your@email.com" style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:100, padding:"14px 24px", fontFamily:"Barlow", fontSize:14, color:"#fff", outline:"none", minWidth:240 }} />
          <button
            style={{ background:"#0a0a0a", border:"none", borderRadius:100, padding:"14px 32px", fontFamily:"Syne", fontWeight:700, fontSize:14, color:"#ff5722", cursor:"pointer", whiteSpace:"nowrap", transition:"background 0.2s" }}
            onMouseEnter={e=>e.target.style.background="#fff"}
            onMouseLeave={e=>e.target.style.background="#0a0a0a"}
          >Subscribe →</button>
        </div>
      </div>
    </div>
  );
}