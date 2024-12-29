const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express();
const bcrypt = require('bcrypt')
app.use()

const dbPath = path.join(__dirname, 'userData.db')

let db = null

const initializeDBAndServer = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })

        app.listen(3000,() => {
            console.log('server is runnint at https://vamshincue4njscpfvwof.drops.nxtwave.tech..')
        })
    }catch(e){
        console.log(`DB Error: ${e.message}`)
    }
}

initializeDBAndServer();

//API 1
app.post('/register/', async (req,res) => {
    try{
        const {
            username,name,password,gender,location
        } = req.body

    }
})