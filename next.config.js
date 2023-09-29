/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'googleusercontent.com',
      'lh3.googleusercontent.com',
      'public.blob.vercel-storage.com'
    ]
  }
};

module.exports = nextConfig;
