import 'dotenv/config'
import expess from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoute.js'


// APP Config
const PORT = process.env.PORT || 4000
const app = expess()

// initialize Middleware
app.use(expess.json())
app.use(cors())

await connectDB()


// API routes
app.get('/', (req,res)=>res.send('API Working'))
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)



app.listen(PORT, ()=> console.log('server Running on port' + PORT))