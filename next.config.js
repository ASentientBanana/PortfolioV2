/** @type {import('next').NextConfig} */
module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ]
  // },
};
