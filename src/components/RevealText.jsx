import { motion } from 'framer-motion';

export default function RevealText({ as: Tag = 'div', className = '', children, delay = 0 }) {
  const words = String(children).split(' ');

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.035,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
