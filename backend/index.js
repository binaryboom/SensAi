import express, { urlencoded } from "express"
import cors from "cors"
import dotenv from 'dotenv'
import connectDB from "./utils/db.js";
import parseResume from "./utils/ocr.js";
import resumeSummarizer from "./utils/ai.js";

dotenv.config({})

const PORT=process.env.PORT || 3000;

const app=express();
app.use(express.json());
app.use(urlencoded({extended:true}));

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}


app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    return res.json({
        message:'Hi there',
        success:true
    })
})

app.post("/extract-text", async (req, res) => {
    try {
      const { base64 } = req.body; 
      const data = await parseResume(base64); // Extract text from PDF
      console.log(data)
      const summary=await resumeSummarizer(data);
      // console.log(summary)
  
      res.json({ success:true,message: summary }); // Send extracted text to frontend
    } catch (error) {
      res.status(500).json({ error: "Failed to extract text" });
    }
  });


app.listen(PORT,()=>{
    // connectDB();
    // console.log('p',parseResume())
    console.log(`Server running at PORT : ${PORT}`);
})

// await resumeSummarizer()