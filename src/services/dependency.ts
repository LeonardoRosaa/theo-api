import axios from 'axios'

class DependencyService {

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

export default new DependencyService()