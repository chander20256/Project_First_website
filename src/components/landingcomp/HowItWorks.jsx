import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Users, Sparkles, Wallet, Landmark } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Users,
    step: "Step 1",
    title: "Sign Up",
    desc: "Login securely with your Google account",
    link: "/signup",
  },
  {
    id: 2,
    icon: Sparkles,
    step: "Step 2",
    title: "Sync Point",
    desc: "Connect and import your existing reward points",
    link: "/sync",
  },
  {
    id: 3,
    icon: Wallet,
    step: "Step 3",
    title: "Earn More",
    desc: "Complete tasks, surveys, and play skill-based games",
    link: "/earn",
  },
  {
    id: 4,
    icon: Landmark,
    step: "Step 4",
    title: "Withdraw",
    desc: "Convert points to real money via UPI or bank transfer",
    link: "/withdraw",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 20 },
  },
};

const StepCard = ({ item }) => {
  const cardRef = useRef(null);
  const Icon = item.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = -(e.clientY - rect.top - rect.height / 2) / 20;

    gsap.to(cardRef.current, {
      rotationY: x,
      rotationX: y,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 0.7,
    });
  };

  return (
    <motion.div variants={cardVariants} className="h-full flex">
      <Link to={item.link} className="block w-full h-full outline-none">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative flex flex-col items-center justify-center text-center rounded-[2rem] p-8 sm:p-10 h-full w-full 
          /* High-Tech Non-Hover State */
          bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] 
          /* Transition */
          transition-all duration-700 ease-out will-change-transform min-h-[360px] overflow-hidden 
          /* Futuristic Hover State */
          hover:bg-gradient-to-br hover:from-[var(--orange)] hover:via-[#ff8800] hover:to-[var(--orange-dark)] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,107,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.4)] gap-6"
        >
          {/* Futuristic Shine Overlay - acts like a scanner beam */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.3)_25%,transparent_30%)] group-hover:animate-[shine_2s_infinite]"></div>

          {/* Icon Box - Glowing Node Effect */}
          <div className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center bg-white/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:-translate-y-2 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.8),inset_0_0_15px_rgba(255,107,0,0.2)] border border-white/50">
            <Icon
              className="w-8 h-8 text-[var(--orange)] transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.6)]"
              strokeWidth={1.75}
            />
          </div>

          {/* Step Number */}
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--gray-500)] transition-colors duration-500 group-hover:text-white/80">
            {item.step}
          </span>

          {/* Title */}
          <h3 className="relative z-10 font-bold text-xl md:text-2xl text-[var(--black)] tracking-tight leading-tight transition-colors duration-500 group-hover:text-white drop-shadow-sm group-hover:drop-shadow-md">
            {item.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-sm leading-relaxed text-[var(--gray-700)] max-w-[220px] mx-auto transition-colors duration-500 group-hover:text-white/90">
            {item.desc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default function HowItWorks() {
  return (
    /* Reduced bottom padding from pb-64 to pb-24 */
    <section className="relative w-full pt-20 pb-24 bg-transparent">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Reduced bottom margin from mb-56 to mb-16/24 */}
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="section-title text-5xl md:text-[4rem] font-black tracking-tight text-[var(--black)] m-0">
            How it Works
          </h2>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {steps.map((item) => (
            <StepCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}