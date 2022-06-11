/** @type {import('next').NextConfig} */
module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  env: {
    BASE_URL: 'http://127.0.0.1:8000'
  },
  images: {
    domains: ['127.0.0.1', 'petarkocic.net']
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/about',
        permanent: false,
      },
    ]
  },
};
