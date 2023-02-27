/* global describe expect test */
import * as fsPath from 'node:path'

import { determineImpliedProject } from '../determine-implied-project'

describe('determineImpliedProject', () => {
  test.each([
    [fsPath.resolve(fsPath.join(__dirname, '..', 'data', 'orgA', 'proj1')), 'orgA/proj1'],
    [fsPath.resolve(fsPath.join(__dirname, '..', 'data', 'orgA', 'proj1', 'subdir')), 'orgA/proj1'],
    [__dirname, 'liquid-labs/liq-projects-lib']
  ])("'%s' -> '%s'", (currDir, expectedProjectName) => {
    expect(determineImpliedProject({ currDir })).toBe(expectedProjectName)
  })
})
