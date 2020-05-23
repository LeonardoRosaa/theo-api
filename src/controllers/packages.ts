import { Request, Response } from 'express'
import PackagesService from '../services/packages'

class PackagesController {

  async update(request: Request, response: Response) {
    const data = await PackagesService.update(request.body)
    return response.json(data)
  }
}

export default new PackagesController()