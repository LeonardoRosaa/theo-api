import { Router } from 'express'

import PackagesController from './controllers/packages'

const routes = Router()

routes.put('/', PackagesController.update)

export default routes;