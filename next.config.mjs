/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "en.wikipedia.org",
      "static.wikia.nocookie.net",
      "m.media-amazon.com",
      "cdn.vox-cdn.com",
    ], // Add the domain(s) from which images will be loaded
  },
};

export default nextConfig;
