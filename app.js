const express = require("express")
var cors = require('cors')

const app = express()
app.use(cors())
const router = express.Router()




router.get("/songs",function(req,res){
    const songs =[
    {
        title: "Love Shack",
        artist: "The B-52s",
        popularity: 10,
        releaseDate: new Date(1989, 6, 20),
        genre: ["pop-rock", "new wave", "surf rock"]
    },

    {
        title: "Rockstar",
        artist: "Nickleback",
        popularirty: 10,
        releaseDate: new Date(2006, 8, 14),
        genre: ["Dad Rock", "Pop Rock", "Goated"]
    }
   
    ]

    res.json(songs)
})

app.use("/api",router)
app.listen(3000)