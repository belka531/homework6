import 'reflect-metadata'
import { createKoaServer } from "routing-controllers"
import setupDb from './db'
import GameController from './games/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [GameController]
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port', port))
  )
  .catch(err => console.error(err))