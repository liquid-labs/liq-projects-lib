/**
* This is a worker-thread script which udpates a projects dependencies.
*/
import { tryExec } from '@liquid-labs/shell-toolkit'

const updateDeps = ({ dryRun, localProjectPath, projectName }) => {
  // no 'set -e' because 'outdated' exits '1' if there's anything to update.
  const outdatedResult = tryExec(`
    cd "${localProjectPath}"
    npm --json outdated`)
  if (outdatedResult.stderr) { // notice we can't check 'code' since 'no updates' exits with code '1'; this is arguable
    // an npm bug...
    throw new Error(`There was an error gathering update data: ${outdatedResult.stdout}`)
  }

  let outdatedData
  try {
    outdatedData = JSON.parse(outdatedResult.stdout)
  }
  catch (err) {
    throw new Error(`Could not parse update data '${outdatedResult.stdout}': ${err}`)
  }

  if (!outdatedData || Object.keys(outdatedData).length === 0) {
    parentPort.postMessage([`No updates found for '${projectName}'.`])
    return { updated : false }
  }

  const actions = []
  let updateCommand = `npm i ${dryRun ? '--dry-run ' : ''}`
  for (const pkgName in outdatedData) { // eslint-disable-line guard-for-in
    const { current, wanted, latest } = outdatedData[pkgName]
    updateCommand += ` ${pkgName}@${wanted}`
    actions.push(`${dryRun ? 'DRY RUN: ' : ''}Updated ${pkgName}@${current} to ${wanted}${wanted === latest ? ' (latest)' : ''}`)
  }

  const updateResult = tryExec(`set -e
    cd "${localProjectPath}"
    ${updateCommand}`)
  if (updateResult.code !== 0) {
    throw new Error(`There was an error updating ${projectName} using '${updateCommand}': ${updateResult.stderr}`)
  }
  parentPort.postMessage(actions)

  return { updated : true }
}

export { updateDeps }
