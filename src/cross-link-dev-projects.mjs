import * as fsPath from 'node:path'

import { readFJSON } from '@liquid-labs/federated-json'
import { tryExec } from '@liquid-labs/shell-toolkit'

const crossLinkDevProjects = ({ playground, projects, reporter }) => {
  // first, let's extarct necessary data and build out our view of the question
  const crossLinks = {}
  reporter?.push(`Gathering project data for ${projects.length} projects...`)
  for (const projectFQN of projects) {
    const [org, project] = projectFQN.split('/')
    const projectPath = fsPath.join(playground, org, project)
    const pkgPath = fsPath.join(projectPath, 'package.json')
    const pkgData = readFJSON(pkgPath)
    crossLinks[projectFQN] = {
      npmName : pkgData.name,
      npmDeps : Object.keys(pkgData.dependencies),
      projectPath
    }
  }

  // now, we analyze
  const links = []
  reporter?.push('Analyzing dependency data...')
  for (const dependencyFQN of projects) {
    const { npmName: dependencyNPMName, projectPath: dependencyPath } = crossLinks[dependencyFQN]

    const otherProjects = projects.filter((p) => p !== dependencyFQN)
    for (const dependentFQN of otherProjects) {
      const { npmDeps, projectPath: dependentPath } = crossLinks[dependentFQN]
      if (npmDeps.includes(dependencyNPMName)) {
        links.push({ dependencyFQN, dependencyNPMName, dependencyPath, dependentFQN, dependentPath })
      }
    }
  }

  for (const { dependencyFQN, dependencyNPMName, dependencyPath, dependentFQN, dependentPath } of links) {
    reporter?.push(`Linking dependency ${dependencyFQN} to dependent ${dependentFQN}...`)
    tryExec(`cd '${dependencyPath}' && yalc publish`)
    tryExec(`cd '${dependentPath}' && yalc add ${dependencyNPMName}`)
  }
}

export { crossLinkDevProjects }
