import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */

// Simulate __dirname in ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  webpack: (config) => {
    // Define '@' alias to point to the 'src' directory
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
