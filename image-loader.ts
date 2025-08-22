import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({ src }: ImageLoaderProps) {
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  if (src === "/hero.png") {
    return `https://imagedelivery.net/gwqtS4kafZruByi--g_VMg/af1a92bf-8fb6-4ce3-b9cc-b2002fcb4100/public?quality=100`;
  }

  if (src === "/logo.png") {
    return `https://imagedelivery.net/gwqtS4kafZruByi--g_VMg/1c342f76-f1f0-405e-d68b-ff9f84d17a00/public?quality=100`;
  }

  return `/${normalizeSrc(src)}`;
}
