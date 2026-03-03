import express from "express";
import dotenv from "dotenv";
dotenv.config();
import courseRoutes from "./routes/courseRoutes.js"
import { connectDB } from "./config/db.js";
import cors from "cors";

const app = express();

const port = process.env.PORT|| 3001
app.use(cors(
    {
        // origin:'http://localhost:5173'
    }
))
//     res.status(200).json("Hello")
//     console.log("Hello")
// })
// app.listen(port,()=>{
//     console.log(`http://localhost:${port}`)
// })
app.use(express.json())
app.use("/courses", courseRoutes)
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/courses`)
    })
})


