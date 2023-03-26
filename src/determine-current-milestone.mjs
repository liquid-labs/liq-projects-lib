import { CredentialsDB, purposes } from '@liquid-labs/liq-credentials-db'
import { Octocache } from '@liquid-labs/octocache'
import { minVersion } from '@liquid-labs/versioning'

const determineCurrentMilestone = async({ app, cache, gitHubOrg, project }) => {
  const credDB = new CredentialsDB({ app, cache })
  const authToken = credDB.getToken(purposes.GITHUB_API)

  const octocache = new Octocache({ authToken })

  const milestoneData = await octocache.paginate(`GET /repos/${gitHubOrg}/${project}/milestones`)

  const milestones = milestoneData.map((m) => m.title)

  const minTitle = minVersion({ versions : milestones, ignoreNonVersions : true })

  return milestoneData.find((m) => m.title === minTitle)?.number
}

export { determineCurrentMilestone }
