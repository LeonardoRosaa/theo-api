
import PackagesService from '../../src/services/packages'
import IPackageJSON from '../../src/interfaces/package_json'

import packageJsonForTest from './package.json'

describe('Packages', () => {
  it('Update packages and return same updated', async () => {
    await PackagesService.update(packageJsonForTest as IPackageJSON)
  })
})