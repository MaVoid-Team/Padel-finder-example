const isGitHubPagesBuild = process.env.BUILD_TARGET === 'github-pages'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const basePath = isGitHubPagesBuild && repoName ? `/${repoName}` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPagesBuild
    ? {
        output: 'export',
      }
    : {}),
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
}

export default nextConfig
