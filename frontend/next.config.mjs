/** @type {import('next').NextConfig} */
const nextConfig = {};

const withTM = require('next-transpile-modules')(['tailwindcss']);

module.exports = withTM();

export default nextConfig;
