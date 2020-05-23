import IPackagesService from "../interfaces/packages_service"
import IPackageJSON from '../interfaces/package_json'

import axios from 'axios'

class Packages implements IPackagesService {
  
  private packages: IPackageJSON = {}
  
  async update(packageJSON: IPackageJSON): Promise<any> {
    
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
    }
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
      const info = await this.getInfoDependency(key)
      infosDependencies.push(info)
    }

    return infosDependencies
  }

  async getInfoDependency(nameDependency: string) {
    try {
      const dependencyInfo = await axios.get(`https://registry.npmjs.com/${nameDependency}`)

      const { latest, next } = dependencyInfo.data['dist-tags']
      return {
        name: nameDependency,
        latest,
        next
      } as IInfoDependency
    } catch(error) {
      console.log(error)
      return {} as IInfoDependency
    }
  }
  
}

export default new Packages()