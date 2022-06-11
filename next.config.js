/** @type {import('next').NextConfig} */
module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  env: {
    BASE_URL: 'https://admin.petarkocic.net'
  },
  images: {
    domains: ['127.0.0.1', 'petarkocic.net','admin.petarkocic.net']
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
