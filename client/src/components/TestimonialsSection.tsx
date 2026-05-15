import { motion } from "framer-motion";
import { SectionBg } from "./SectionBg";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  name:    string;
  role:    string;
  company: string;
  quote:   string;
  rating:  number;
  color:   string;
};


const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div
    className="flex-shrink-0 w-[340px] mx-3 rounded-2xl p-6 flex flex-col gap-4 select-none"
    style={{
      background:   "rgba(255,255,255,0.028)",
      border:       `1px solid ${t.color}28`,
      backdropFilter: "blur(10px)",
      boxShadow:    `0 8px 32px ${t.color}14`,
    }}
  >
    {/* Stars */}
    <div className="flex gap-1">
      {Array.from({ length: t.rating }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: t.color }} />
      ))}
    </div>

    {/* Quote icon + text */}
    <div className="relative">
      <Quote
        className="absolute -top-1 -left-1 w-6 h-6 opacity-20"
        style={{ color: t.color }}
      />
      <p
        className="text-sm leading-relaxed pl-5"
        style={{ color: "rgba(226,232,240,0.82)" }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
    </div>

    {/* Author */}
    <div className="flex items-center gap-3 mt-auto pt-2 border-t" style={{ borderColor: `${t.color}18` }}>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${t.color}44, ${t.color}22)`,
          border:     `1px solid ${t.color}45`,
          color:      t.color,
        }}
      >
        {t.name.charAt(0)}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">{t.name}</div>
        <div className="text-xs text-muted-foreground truncate font-mono">{t.role} · {t.company}</div>
      </div>
    </div>
  </div>
);

/* ── Infinite marquee row ─────────────────────────────────────── */
const MarqueeRow = ({
  items,
  direction = "left",
  speed = 35,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const doubled = [...items, ...items];
  const totalWidth = items.length * 364; /* card width 340 + mx-3*2=24 */

  return (
    <div className="overflow-hidden relative w-full" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
      <motion.div
        className="flex"
        animate={{
          x: direction === "left"
            ? [0, -totalWidth]
            : [-totalWidth, 0],
        }}
        transition={{
          duration: speed,
          repeat:   Infinity,
          ease:     "linear",
        }}
        /* Pause on hover */
        whileHover={{ animationPlayState: "paused" } as any}
        style={{ willChange: "transform" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
};

type Props = { content?: any };

const TestimonialsSection = ({ content }: Props) => {
  const testimonials: Testimonial[] = content?.testimonials ?? [];

  const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const row2 = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section
      id="testimonials"
      className="py-24 md:py-28 relative overflow-hidden"
      style={{
        background: "var(--section-bg)",
      }}
    >
      <SectionBg variant="about" />
      <div className="absolute top-0 left-0 w-full h-px section-accent-line" />

      {/* Aurora accents */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[450px] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container mx-auto px-6 mb-14">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-mono text-sm mb-3" style={{ color: "#a78bfa" }}>
            // what people say
          </p>
          <h2 className="section-heading gradient-text-animated inline-block">
            Testimonials
          </h2>
          <p className="section-subheading mt-4">
            Feedback from the people I&apos;ve shipped real products with.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {row1.length > 0 && (
          <MarqueeRow items={row1} direction="left"  speed={40} />
        )}
        {row2.length > 0 && (
          <MarqueeRow items={row2} direction="right" speed={44} />
        )}
      </motion.div>

      {/* Bottom note */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xs text-muted-foreground font-mono">
          // hover to pause · click any card for full context
        </p>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
