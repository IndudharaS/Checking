export default function SectionLabel({ children, className = '' }) {
  return (
    <p className={`text-comment text-xs sm:text-sm font-medium tracking-tight mb-4 ${className}`}>
      {'// '}
      {children}
    </p>
  );
}
