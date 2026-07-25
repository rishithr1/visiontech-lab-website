/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow external images from Unsplash and VTL CDN
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "vtl.iittp.ac.in" },
    ],
  },
};

export default nextConfig;