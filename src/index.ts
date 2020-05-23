import AppController from './app_controller'

const PORT = process.env.PORT || 8000

console.log(`Started server on PORT => ${PORT} `)

AppController.listen(PORT)