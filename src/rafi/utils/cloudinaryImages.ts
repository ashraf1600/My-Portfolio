/** Asset delivery: all images are served from this site's own /public/assets folder. */
export function cloudinaryOriginal(pathOrUrl: string): string {
  return pathOrUrl;
}

export function cloudinaryImage(pathOrUrl: string, _width?: number): string {
  return pathOrUrl;
}

export function cloudinaryResized(pathOrUrl: string, width: number): string {
  return cloudinaryImage(pathOrUrl, width);
}

/** Local files have a single size, so the srcset collapses to one candidate. */
export function cloudinarySrcset(pathOrUrl: string, _widths: number[]): string {
  return pathOrUrl;
}

export function cloudinaryProjectCover(slug: string, width = 1200): string {
  return cloudinaryImage("/assets/project-covers/" + slug + ".webp", width);
}

export function cloudinaryProjectCoverSrcSet(slug: string): string {
  return "/assets/project-covers/" + slug + ".webp";
}
