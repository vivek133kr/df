/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "cdn.pixabay.com",
      "www.timeanddate.com",
      "d187qskirji7ti.cloudfront.net",
    ],
  },
};

module.exports = nextConfig
