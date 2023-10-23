import createError from 'http-errors'

import { getPackageJSON } from './get-package-json'

const getImpliedPackageJSON = async ({ callDesc, req }) => {
  const currDir = req.get('X-CWD')
  if (currDir === undefined) {
    throw createError.BadRequest(`Called '${callDesc}' for implied project, but 'X-CWD' header not found.`)
  }

  const pkgJSON = await getPackageJSON({ currDir })

  return pkgJSON
}

export { getImpliedPackageJSON }
