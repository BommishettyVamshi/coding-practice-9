const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
const bcrypt = require('bcrypt')
app.use(express.json())

const dbPath = path.join(__dirname, 'userData.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log(
        'server is runnint at https://vamshincue4njscpfvwof.drops.nxtwave.tech..',
      )
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
  }
}

initializeDBAndServer()

//API 1
app.post('/register/', async (req, res) => {
  try {
    const {username, name, password, gender, location} = req.body

  
    const selectQuery = `select * from user where username = '${username}';`
    const dbUser = await db.get(selectQuery)

    if (dbUser !== undefined) {
      res.status(400).send('User already exists')
    } else if (password.length < 5) {
      res.status(400).send('Password is too short')
    } else {
      const createQuery = `
                insert into user (username,name,password,gender,location) 
                values ('${username}','${name}','${hashedPassword}','${gender}','${location}');
            `
      const dbUserId = await db.run(createQuery)
      res.status(400).send(`User created successfully`)
    }
  } catch (e) {
    console.log(`Request Error: ${e.message}`)
  }
})
