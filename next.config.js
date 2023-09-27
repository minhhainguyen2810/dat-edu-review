/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'googleusercontent.com',
      'public.blob.vercel-storage.com'
    ]
  }
};

module.exports = nextConfig;
