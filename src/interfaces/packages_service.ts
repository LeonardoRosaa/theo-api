import IPackageJSON from "./package_json";

interface IPackagesService {
  update(packageJSON: IPackageJSON): Promise<any>
}

export default IPackagesService