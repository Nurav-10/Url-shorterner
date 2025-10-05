import express from 'express'
import dbconnect from './db/db.js'
import urlRoute from './routes/urlRoute.js'

const PORT=4001
const app=express()


dbconnect()

app.use(express.json())


//shorterner route.
app.use('/shorterner',urlRoute)

app.get('/',(req,res)=>{
   res.json({
      message:'Hello from url-shortner',
      status:200
   })
})

app.listen(PORT,()=>{
   console.log(`Server is running at ${PORT}`)
})