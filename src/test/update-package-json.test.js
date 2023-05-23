/* global beforeAll describe expect test */
import { readFileSync } from 'node:fs'
import * as fs from 'node:fs/promises'
import * as fsPath from 'node:path'

import { updatePackageJSON } from '../update-package-json'

const proj1Root = fsPath.resolve(fsPath.join(__dirname, 'data', 'orgA', 'proj1'))
const proj1PkgJSONPath = fsPath.join(proj1Root, 'package.json')

const proj1PkgJSON = JSON.parse(readFileSync(proj1PkgJSONPath, { encoding : 'utf8' }))

describe('updatePackageJSON', () => {
  const proj1ARoot = fsPath.resolve(proj1Root, '..', 'proj1-update-package-test')
  const proj1APkgJSONPath = fsPath.join(proj1ARoot, 'package.json')
  beforeAll(async() => {
    await fs.cp(proj1Root, proj1ARoot, { recursive : true })
  })

  test('updates package data', async() => {
    const newJSON = structuredClone(proj1PkgJSON)
    newJSON.foo = true
    await updatePackageJSON({ json : newJSON, pkgDir : proj1ARoot })
    const newPkgJSON = JSON.parse(readFileSync(proj1APkgJSONPath))
    expect(newPkgJSON).toEqual(newJSON)
  })
})
