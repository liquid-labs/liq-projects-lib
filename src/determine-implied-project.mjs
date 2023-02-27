import { existsSync } from 'node:fs'
import * as fsPath from 'node:path'

const determineImpliedProject = ({ currDir }) => {
  do {
    const pkgPath = fsPath.join(currDir, 'package.json')
    if (existsSync(pkgPath)) {
      return fsPath.basename(fsPath.dirname(currDir)) + '/' + fsPath.basename(currDir)
    }
    currDir = fsPath.dirname(currDir)
  } while (currDir !== '' && currDir !== fsPath.sep)

  return null
}

export { determineImpliedProject }
