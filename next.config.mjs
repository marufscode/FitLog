/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Ensures deployed static assets and client-side routes resolve on
  // hard reload / direct navigation instead of throwing 404s.
  trailingSlash: false,
};

export default nextConfig;
