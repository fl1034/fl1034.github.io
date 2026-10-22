/** Portable static export for domain roots and GitHub Pages project paths. */
const nextConfig = {
    output: "export",
    assetPrefix: ".",
    images: {unoptimized: true},
    trailingSlash: true,
    reactStrictMode: true
};
export default nextConfig;
