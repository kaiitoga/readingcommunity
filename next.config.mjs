import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// ESモジュールでの __dirname 設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'), // 'src' フォルダをエイリアスとして設定
    };
    return config;
  },
};

export default nextConfig;

