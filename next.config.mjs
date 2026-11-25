/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The site is now one parallax page — old section URLs land on the matching section.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/skills", destination: "/#skills", permanent: false },
      { source: "/projects", destination: "/#projects", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/blog", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
