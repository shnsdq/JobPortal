import express, {urlencoded} from "express"
import { dbConnect } from "./db/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoute from "./routes/user.routes.js";
import jobRoute from "./routes/job.routes.js";
import companyRoute from './routes/company.routes.js'
import applicationRoute from './routes/application.routes.js'

dotenv.config();
const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));


app.get('/',async (req,res) => {
    res.json({success:true,message:"HomePage"})
})

//routes
app.use('/api/user',userRoute);
app.use('/api/job',jobRoute);
app.use('/api/company',companyRoute);
app.use('/api/application',applicationRoute);

const PORT = process.env.PORT 

app.listen(PORT,()=> console.log(`Server is listening at : ${PORT}`))
