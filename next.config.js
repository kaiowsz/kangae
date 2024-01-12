/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                pathname: "/**"
            },
            {
                hostname: "lh3.googleusercontent.com",
                pathname: "/**",
                protocol: "https"
            }
        ]
    }
}

module.exports = nextConfig