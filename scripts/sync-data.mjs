// Copies the source dataset into public/ so the production build can serve it
// as a static endpoint. Development uses JSON Server (npm run mock) instead.
import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const source = resolve('data/tools.json')
const target = resolve('public/api/tools.json')

await mkdir(dirname(target), { recursive: true })
await copyFile(source, target)
console.log('Synced data/tools.json -> public/api/tools.json')
