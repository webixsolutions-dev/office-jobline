/**
 * Standard page/section horizontal gutters.
 * Uses global `.site-container` from `src/style/layout.css` (px-6 sm:px-12 md:px-16 lg:px-24).
 */
export default function SiteContainer({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`site-container${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}
