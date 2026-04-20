import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface StaggeredTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  children?: ReactNode;
}

export function StaggeredText({
  text,
  className = "",
  as = "h2",
  delay = 0,
  stagger = 0.04,
}: StaggeredTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const words = text.split(" ");

  const Tag = motion[as];

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
