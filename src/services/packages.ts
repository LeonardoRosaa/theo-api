import IPackagesService from "../interfaces/packages_service"
import IPackageJSON from '../interfaces/package_json'

import IDataResponsePackage from "../interfaces/data_response_package"
import DependencyService from './dependency'
class Packages implements IPackagesService {
  
  private packages: IPackageJSON = {}
  
  async update(packageJSON: IPackageJSON): Promise<IDataResponsePackage> {
    
    this.packages = packageJSON

    const response = await Promise.all([
      this.iterableDependenciesAndGetInfo(packageJSON?.dependencies),
      this.iterableDependenciesAndGetInfo(packageJSON?.devDependencies)
    ])

    const builtUpdatedPackages = await Promise.all([
      this.buildUpdatePackages('dependencies', response[0]),
      this.buildUpdatePackages('devDependencies', response[1]),
    ])

    const updatedPackages: IPackageJSON = {
      dependencies: builtUpdatedPackages[0],
      devDependencies: builtUpdatedPackages[1]
    }

    return { 
      yourUpdatedSettings: updatedPackages, 
      yourCurrentSettings: this.packages 
    } as IDataResponsePackage
  }

  buildUpdatePackages(
    dependency: 'devDependencies' | 'dependencies', 
    dependenciesNPM: IInfoDependency[]
  ) {
    const packageJSON: IPackageJSON = { devDependencies: {}, dependencies: {} }
    
    for (const key in this.packages[dependency]) {
      const dependencyFound = dependenciesNPM.find(d => d.name === key)

      const { latest } = dependencyFound

      packageJSON[dependency][key] = this.formatVersionPackage(
        this.packages[dependency][key],
        latest
      )
    }

    return packageJSON[dependency]
  }

  formatVersionPackage(currentVersion: string, npmVersion: string) {
    if (currentVersion.includes('^')) {
      return `^${npmVersion}`
    } else if (currentVersion.includes('~')) {
      return `~${npmVersion}`
    } 

    return npmVersion
  }

  async iterableDependenciesAndGetInfo(dependency: object) {
    let infosDependencies: IInfoDependency[] = []
    
    for (const key in dependency) {
      const info = await DependencyService.getInfoDependency(key)
      infosDependencies.push(info)
    }

    return infosDependencies
  }  
}

export default new Packages()