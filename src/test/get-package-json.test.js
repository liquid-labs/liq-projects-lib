/* global describe expect test */
import { readFileSync } from 'node:fs'
import * as fsPath from 'node:path'

import { getPackageJSON } from '../get-package-json'

const proj1Root = fsPath.resolve(fsPath.join(__dirname, 'data', 'orgA', 'proj1'))
const proj1PkgJSONPath = fsPath.join(proj1Root, 'package.json')
const myPkgJSONPath = fsPath.resolve(__dirname, '..', '..', 'package.json')

const proj1PkgJSON = JSON.parse(readFileSync(proj1PkgJSONPath, { encoding : 'utf8' }))
const myPkgJSON = JSON.parse(readFileSync(myPkgJSONPath, { encoding : 'utf8' }))

describe('getPackageJSON', () => {
  test.each([
    [fsPath.resolve(__dirname, 'data', 'orgA', 'proj1'), proj1PkgJSON],
    [fsPath.resolve(__dirname, 'data', 'orgA', 'proj1', 'subdir'), proj1PkgJSON],
    [fsPath.join(__dirname, 'data', 'orgA', 'proj1'), proj1PkgJSON],
    [fsPath.join(__dirname, 'data', 'orgA', 'proj1', 'subdir'), proj1PkgJSON],
    [__dirname, myPkgJSON]
  ])("finds 'package.json' from '%s'", async(currDir, expectedPkgJSON) => {
    expect(await getPackageJSON({ currDir })).toEqual(expectedPkgJSON)
  })
})
