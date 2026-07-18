import express, {urlencoded} from "express"
import { dbConnect } from "./db/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoute from "./routes/user.routes.js";
import jobRoute from "./routes/job.routes.js";
import companyRoute from './routes/company.routes.js'
import applicationRoute from './routes/application.routes.js'
import path from "path";

dotenv.config({});
const app = express();

const _dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));


app.get('/',async (req,res) => {
    res.json({success:true,message:"HomePage"})
})

//routes
app.use('/api/v1/user',userRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/application',applicationRoute);

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0",()=>{
    dbConnect();
     console.log(`Server is listening at : ${PORT}`)})
