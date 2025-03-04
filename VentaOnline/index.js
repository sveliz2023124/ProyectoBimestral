import { connect } from './configs/mongo.js'
import { InitServer } from './configs/app.js'
import { DefaultAdmin, categoryDefault } from './utils/defaultMethods.js'

//Datos del usuario default 
/* username: "sveliz",
   mail: "sveliz-2023124@kinal.edu.gt",
   password: "Admin123?",
*/
categoryDefault()
DefaultAdmin()
InitServer()
connect()