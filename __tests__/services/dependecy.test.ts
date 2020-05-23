import DependencyService from '../../src/services/dependency'

describe('Dependency service', () => {
  it('Should return a latest version about package', async () => {
    const bootstrapPackage = 'bootstrap'

    const infoPackage = await DependencyService.getInfoDependency(bootstrapPackage)

    expect(infoPackage.latest).not.toBeUndefined()
    expect(infoPackage.latest).not.toBeNull()
  })
})