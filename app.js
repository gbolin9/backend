const express = require("express");
const Song = require("./models/songs");
var cors = require("cors")
//const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require("./models/users")

const app = express();
app.use(cors())

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();
const secret = "supersecret"

//creating a user
router.post("/users", async(req,res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password"})
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status

    })
    try{
        newUser.save()
        res.sendStatus(201)
    }
    catch(err){
        res.status(400).send(err)

    }
    
})

//Authenticate or login
router.post("/auth", async(req,res)=>{
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password"})
        return 
    }
    //try to find username in database and see if it matches
    let user = await User.findOne({username : req.body.username})
    
        if(!user){
            res.status(401).json({error: "Bad Username"})
        }
        else{
            if(user.password != req.body.password){
                res.status(401).json({error: "Bad Password"})
            }
            else{
                username2 = user.username
                const token = jwt.encode({username: user.username}, secret)
                const auth = 1

                res.json({
                    username2,
                    token:token,
                    auth:auth
                })
            }
        }
    })

    router.get("/status", async(req,res) => {
        if(!req.headers["x-auth"]){
            return res.status(401).jason({error: "Missing X-Auth"})
        }

        const token = req.headers["x-auth"]
        try{
            const decoded = jwt.decode(token,secret)

            let users = User.find({}.filter("username status"))
            res.json(users)
        }
        catch(ex){
            res.status(401).json({error: "invalid jwt"})
        }
    })


// Get list of all songs in the database
router.get("/songs", async function(req, res) {
   try {
      const songs = await Song.find();
      res.json(songs);
   }
   catch (err) {
      res.status(400).send(err);
   }
});

router.get("/songs/:id", async(req,res) => {
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
        
    }
    catch (err){
        res.status(400).send(err)
    }
})

// Add a new song to the database
router.post("/songs", async function(req, res) {
   try {
      const song = await new Song(req.body);
      await song.save();
      res.status(201).json(song);
   }
   catch (err) {
      res.status(400).send(err);
   }
});

router.put("/songs/:id", async(req,res) => {
    try{
        const song = req.body
        await Song.updateOne({_id :req.params.id}, song)
        res.sendStatus(204)

    }
        catch(err){
        res.status(400).send(err)
    
    }
})

router.delete("/songs/:id", async(req,res) =>{

    try{
        const song = await Song.findById(req.params.id)
        console.log(song)
        await Song.deleteOne({_id: song._id})
        

    }
    catch(err){
        res.status(400).send(err)

    }

})

app.use("/api", router);

app.listen(3000, () => console.log("server running"));