import PackagesService from '../../src/services/packages'
import packageJSON from './package.json'

describe('Packages Service', () => {

  it('Should return with special notation', () => {
    let currentNotation = '^1.4.5'
    const latestNotation = '2.2.1'

    let versionFormated = PackagesService.formatVersionPackage(currentNotation, latestNotation)
    expect(versionFormated).toContain('^')

    currentNotation = '~1.4.5'

    versionFormated = PackagesService.formatVersionPackage(currentNotation, latestNotation)
    expect(versionFormated).toContain('~')

    currentNotation = '1.4.5'

    versionFormated = PackagesService.formatVersionPackage(currentNotation, latestNotation)
    expect(versionFormated).not.toContain('~')
    expect(versionFormated).not.toContain('^')

  })

  it('Should returns array of InfoDependencies', async () => {
    const devDependencies = packageJSON.devDependencies

    const response = await PackagesService.iterableDependenciesAndGetInfo(devDependencies)

    expect(response).toHaveLength(2)
    expect(response[0]).toHaveProperty('name')
    expect(response[0]).toHaveProperty('latest')
  })
})