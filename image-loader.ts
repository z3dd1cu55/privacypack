import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({ src }: ImageLoaderProps) {
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  if (src === "/hero.png") {
    return `https://imagedelivery.net/gwqtS4kafZruByi--g_VMg/fea201d8-402f-42d4-c779-9c3f6a069600/public?quality=100`;
  }

  if (src === "/logo.png") {
    return `https://imagedelivery.net/gwqtS4kafZruByi--g_VMg/1c342f76-f1f0-405e-d68b-ff9f84d17a00/public?quality=100`;
  }

  return `/${normalizeSrc(src)}`;
}
