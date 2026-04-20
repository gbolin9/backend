const express = require("express")

const app = express()
const router = express.Router()

app.listen(3000,function(){
    console.log("Listening on port 3000")
})

