import * as fs from 'node:fs/promises'
import * as fsPath from 'node:path'

import findRoot from 'find-root'

const updatePackageJSON = async({ json, pkgDir }) => {
  const rootDir = findRoot(pkgDir)
  const pkgPath = fsPath.join(rootDir, 'package.json')

  return await fs.writeFile(pkgPath, JSON.stringify(json, null, '  '))
}

export { updatePackageJSON }
