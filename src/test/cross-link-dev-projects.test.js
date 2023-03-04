/* global describe expect test */
import * as fsPath from 'node:path'

import { crossLinkDevProjects } from '../cross-link-dev-projects'

describe('crossLinkDevProjects', () => {
  test('can deal with lack of dependencies', () => {
    const playground = fsPath.resolve(fsPath.join(__dirname, '..', 'data'))
    expect(() => {
      const links = crossLinkDevProjects({ 
        dryRun:true, 
        playground,
        projects: ['orgA/proj1']
      })
    }).not.toThrow()
  })
})