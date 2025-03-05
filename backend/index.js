import express, { urlencoded } from "express"
import cors from "cors"
import dotenv from 'dotenv'
import connectDB from "./utils/db.js";
import parseResume from "./utils/ocr.js";
import {resumeSummarizer,resumeInsightMode, handsOnMode, codeMasteryMode} from "./utils/ai.js";

dotenv.config({})

const PORT=process.env.PORT || 3000;

const app=express();
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
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

app.post("/summarize-text", async (req, res) => {
    try {
      const { resume } = req.body; 
      const summary=await resumeSummarizer(resume);
      res.json({ success:true,message: summary }); // Send extracted text to frontend
    } catch (error) {
      res.status(500).json({ error: "Failed to extract text" });
    }
  });

app.post('/resume-insight', async (req, res) => {
  try {
    const {resume, conversationHistory, level}=req.body;
    const summary=await resumeInsightMode(resume, conversationHistory, level);
    res.json({ success:true,message: summary }); // Send extracted text to frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to extract text" });
  }
});

app.post('/hands-on', async (req, res) => {
  try {
    const { conversationHistory, level}=req.body;
    const summary=await handsOnMode(conversationHistory, level);
    res.json({ success:true,message: summary }); // Send extracted text to frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to extract text" });
  }
});

app.post('/code-mastery', async (req, res) => {
  try {
    const { skills,conversationHistory, level}=req.body;
    const summary=await codeMasteryMode(skills,conversationHistory, level);
    console.log('summary at index',summary)
    res.json({ success:true,message: summary }); // Send extracted text to frontend
  } catch (error) {
    console.log('error at index',error)
    res.status(500).json({ error: "Failed to extract text" });
  }
});

app.listen(PORT,()=>{
    // connectDB();
    // console.log('p',parseResume())
    console.log(`Server running at PORT : ${PORT}`);
})

// await resumeSummarizer()