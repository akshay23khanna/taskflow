import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const standaloneDir = '.next/standalone';

if (existsSync(standaloneDir)) {
  if (existsSync('public')) {
    await cp('public', `${standaloneDir}/public`, { recursive: true });
  }

  if (existsSync('.next/static')) {
    await mkdir(`${standaloneDir}/.next`, { recursive: true });
    await cp('.next/static', `${standaloneDir}/.next/static`, { recursive: true });
  }
}
