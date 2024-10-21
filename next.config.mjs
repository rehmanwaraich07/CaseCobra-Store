/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"]
  },
    webpack: (config, { dev, isServer }) => {
      // Disable caching in development
      if (dev) {
        config.cache = false;
      }
      
      // Optimize caching for favicon.ico
      config.module.rules.push({
        test: /favicon\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'favicon.ico',
              publicPath: '/_next',
            },
          },
        ],
      });
      
  
      return config;
    },
  };
  
  export default nextConfig;