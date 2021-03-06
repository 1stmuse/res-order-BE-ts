import  express, {Application, Request, Response} from 'express'
import DB from './startup/dbInit'
import routes from './startup/routes'

export const app: Application = express()

console.log(process.env.DB)
DB()
routes(app)

app.listen(8080, ()=>{
    console.log('server running')
})