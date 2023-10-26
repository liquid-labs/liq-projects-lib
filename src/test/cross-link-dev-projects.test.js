/* global describe expect test */
import * as fsPath from 'node:path'

import { crossLinkDevProjects } from '../cross-link-dev-projects'

describe('crossLinkDevProjects', () => {
  test('can deal with lack of dependencies', () => {
    const proj1Path = fsPath.join(__dirname, 'data', 'orgA', 'proj1')

    const appMock = {
      ext : {
        _liqProjects : {
          playgroundMonitor : {
            getProjectData : () => ({ projectPath : proj1Path })
          }
        }
      }
    }

    const playground = fsPath.resolve(fsPath.join(__dirname, 'data'))
    expect(() => {
      const links = crossLinkDevProjects({
        app      : appMock,
        dryRun   : true,
        playground,
        projects : ['@orgA/proj1']
      })
      expect(links).toHaveLength(0)
    }).not.toThrow()
  })
})
