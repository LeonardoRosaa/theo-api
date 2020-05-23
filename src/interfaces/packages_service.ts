import IPackageJSON from "./package_json";
import IDataResponsePackage from './data_response_package'

interface IPackagesService {
  update(packageJSON: IPackageJSON): Promise<IDataResponsePackage>
}

export default IPackagesService