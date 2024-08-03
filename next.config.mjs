/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "en.wikipedia.org",
      "static.wikia.nocookie.net",
      "m.media-amazon.com",
      "cdn.vox-cdn.com",
      "movie-image-dev.s3.amazonaws.com",
    ], // Add the domain(s) from which images will be loaded
  },
};

export default nextConfig;
