import {signUp,signIn} from "../controller/auth"

import expess from "express"

const routes=expess.Router()

routes.post('/user/signup',signUp)
routes.post('/user/signin',signIn)

export default routes

