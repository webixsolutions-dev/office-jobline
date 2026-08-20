/**
 * Contained (rounded) image + text row — distinct from the full-bleed SplitHero.
 * @param {'left' | 'right'} [imagePosition]
 */
export default function ImageTextRow({
  imageUrl,
  imageAlt = '',
  heading,
  children,
  imagePosition = 'left',
}) {
  const image = (
    <div className="h-64 w-full overflow-hidden rounded-xl sm:h-80 lg:h-[400px]">
      <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" />
    </div>
  )

  const text = (
    <div>
      {heading && (
        <>
          <h3 className="font-display text-2xl font-bold text-navy sm:text-3xl">{heading}</h3>
          <span className="mt-2 block h-1 w-14 rounded-full bg-gold" />
        </>
      )}
      {children}
    </div>
  )

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
      {imagePosition === 'right' ? (
        <>
          {text}
          {image}
        </>
      ) : (
        <>
          {image}
          {text}
        </>
      )}
    </div>
  )
}
