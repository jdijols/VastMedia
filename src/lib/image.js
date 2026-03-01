const UNSPLASH_REGEX = /images\.unsplash\.com/
const WIDTHS = [400, 800, 1200, 1600, 2000]

export function isUnsplash(url) {
  return typeof url === 'string' && UNSPLASH_REGEX.test(url)
}

function unsplashUrl(base, width) {
  const url = base.split('?')[0]
  return `${url}?w=${width}&q=80&fm=webp&fit=crop`
}

export function getSrcSet(src) {
  if (!isUnsplash(src)) return undefined
  return WIDTHS.map((w) => `${unsplashUrl(src, w)} ${w}w`).join(', ')
}

export function getOptimizedSrc(src, width = 1600) {
  if (!isUnsplash(src)) return src
  return unsplashUrl(src, width)
}
