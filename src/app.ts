import  express, {Application, Request, Response} from 'express'
import DB from './startup/dbInit'
import routes from './startup/routes'
import User from "./models/userModel"

export const app: Application = express()
const removeUser = async () =>{
    console.log("removing all user")
    await User.remove({})
    console.log("removed all users")
}


console.log(process.env.DB)
DB()
routes(app)

// removeUser()



app.listen(8081, ()=>{
    console.log(`server running`)
})