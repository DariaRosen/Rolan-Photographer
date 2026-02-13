/**
 * Returns a Cloudinary URL with size and format optimizations.
 * - f_auto: serve WebP/AVIF when supported
 * - q_auto: automatic quality
 * - w_* + c_limit: max width, preserve aspect ratio
 * Use for responsive images to cut download size and improve LCP.
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  width: number = 1200
): string {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com') || !url.includes('/image/upload/'))
    return url;
  const transforms = `w_${width},c_limit,f_auto,q_auto`;
  return url.replace(/\/upload\//, `/upload/${transforms}/`);
}
