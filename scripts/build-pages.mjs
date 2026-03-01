import { execSync } from 'node:child_process'
import { existsSync, renameSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const apiPath = path.join(root, 'app', 'api')
const backupPath = path.join(root, 'app', '__api_backup_for_pages__')
let movedApiRoutes = false

function restoreApiRoutes() {
  if (movedApiRoutes && existsSync(backupPath) && !existsSync(apiPath)) {
    renameSync(backupPath, apiPath)
  }
}

function handleTermination(signal) {
  try {
    restoreApiRoutes()
  } finally {
    process.exit(signal === 'SIGINT' ? 130 : 143)
  }
}

process.on('SIGINT', () => handleTermination('SIGINT'))
process.on('SIGTERM', () => handleTermination('SIGTERM'))

try {
  if (existsSync(apiPath)) {
    if (existsSync(backupPath)) {
      throw new Error('Backup folder already exists: app/__api_backup_for_pages__. Please remove it and retry.')
    }
    renameSync(apiPath, backupPath)
    movedApiRoutes = true
    console.log('Temporarily moved app/api for static export build.')
  }

  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_TARGET: 'github-pages',
    },
  })

  console.log('Static export build completed.')
} catch (error) {
  console.error('GitHub Pages build failed.')
  throw error
} finally {
  restoreApiRoutes()
}
