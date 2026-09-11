/**
 * Full-width horizontal gutters (heroes, navbar, full-bleed sections).
 * Uses global `.site-gutter` from `src/style/layout.css` (px-6 sm:px-12 md:px-16 lg:px-24).
 */
export default function SiteGutter({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`site-gutter${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}
