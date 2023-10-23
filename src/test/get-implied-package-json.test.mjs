/* global describe expect test */
import * as fsPath from 'node:path'

import { getImpliedPackageJSON } from '../get-implied-package-json'

const reqMock = (currDir) => ({
  get : (header) => header === 'X-CWD' ? currDir : undefined
})

describe('getImpliedPackageJSON', () => {
  test.each([
    [fsPath.resolve(fsPath.join(__dirname, 'data', 'orgA', 'proj1')), '@orgA/proj1'],
    [fsPath.resolve(fsPath.join(__dirname, 'data', 'orgA', 'proj1', 'subdir')), '@orgA/proj1'],
    [__dirname, '@liquid-labs/liq-projects-lib']
  ])("'%s' -> '%s'", async(currDir, expectedProjectName) => {
    expect((await getImpliedPackageJSON({ req : reqMock(currDir) })).name).toBe(expectedProjectName)
  })
})
