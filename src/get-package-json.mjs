import * as fs from 'node:fs/promises'
import * as fsPath from 'node:path'

import findRoot from 'find-root'

const getPackageJSON = async({ currDir }) => {
  const packageRoot = findRoot(currDir)
  const pkgPath = fsPath.join(packageRoot, 'package.json')

  const contents = await fs.readFile(pkgPath, { encoding : 'utf8' })
  const json = JSON.parse(contents)

  return json
}

export { getPackageJSON }
