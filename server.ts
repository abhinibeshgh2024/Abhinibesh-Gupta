import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Endpoint for Chat Bot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const client = getGeminiClient();
      if (!client) {
        // Fallback response when API key is missing
        return res.json({
          text: `Hi! I'm Abhi-Bot, Abhinibesh's virtual assistant. Currently, my live AI brain is in offline mode because the GEMINI_API_KEY is not configured in the workspace secrets.

Here are some key facts about Abhinibesh I can share with you offline:
- **Education**: CSE B.Tech student at Usha Martin University (GPA 7.5), Intermediate (12th) from BSK College, Maithon (68.4%).
- **Top Projects**: 
  1. *Advanced Multi-Metric Mail Analyzer* (E-spam detection and AI assistant)
  2. *Smart City Finance Analyzer* (municipal budgeting tracker)
  3. *Eco Scan Food Carbon Tracker* (evaluates footprints of food products)
- **Top Skills**: Data Analysis, Data Science, Machine Learning, Frontend development, UI/UX, SQL, Python.
- **Residence**: Simlia, Ranchi, JH, IND.
- **Contact**: Phone/WhatsApp is +91 9142543191. Emails: infostarmedia133@gmail.com, nexpploro@gmail.com.

*To activate my conversational AI abilities, remember to save a valid GEMINI_API_KEY in the Secrets panel in Settings!*`
        });
      }

      const systemInstruction = `
You are 'Abhi-Bot', a smart RAG-based AI assistant representing Abhinibesh Gupta on his personal portfolio website. Your job is to answer questions about Abhinibesh's projects, skills, education, experience, and contact details with accuracy and a polite, helpful, tech-savvy, and warm personality.

Here are the authentic details about Abhinibesh Gupta:
- Name: Abhinibesh Gupta
- Bio/Role: Undergraduate Computer Science and Engineering student at Usha Martin University, Ranchi. Tech enthusiast with specialization in Data Analysis, Data Science, and Machine Learning.
- Residence: Simlia, Ranchi, Jharkhand, India.
- Contact:
  - Phone: +91 9142543191 (Clicking the WhatsApp button opens a direct chat with pre-written "Hi")
  - Primary Email: infostarmedia133@gmail.com
  - Secondary Email: nexpploro@gmail.com
- Education:
  - 12th (Intermediate) from BSK College, Maithon (Result: 68.4%)
  - B.Tech in Computer Science and Engineering from Usha Martin University, Ranchi (Current GPA: 7.5)
- Skills: Data Analysis, Data Science, Machine learning, Frontend development, UI/UX, SQL, Python.
- Strategic Real-World Projects:
  1. Advanced Multi-Metric Mail Analyzer and Assistant:
     - Description: Strategic spam detection tool, email categorization system, and automated assistant with real-world mailing parameters.
     - Live Link: https://email-spam-detection-system-auqefbdapnvhfjefdfkmvo.streamlit.app/
  2. Smart City Finance Analyzer:
     - Description: A visual transparency portal for tracking municipal finance, budgeting, and transaction audits for ease of administrative use.
     - Live Link: https://smart-city-finance-tracker-n2n4y4dxu6siuezvez9ntn.streamlit.app/
  3. Eco Scan Food Carbon Footprints Tracker and Analyzer:
     - Description: Evaluates and details carbon footprints and ecological impacts of dietary ingredients. (No live URL yet).
- Social Media Profiles:
  - LinkedIn: https://www.linkedin.com/in/abhinibesh-gupta-758596265
  - GitHub: https://github.com/abhinibeshgh2024
  - Instagram: https://www.instagram.com/abhinibeshgupta/

Guidelines for your responses:
- Keep answers concise, helpful, objective, and professional.
- Refer to Abhinibesh in the third person (or politely on his behalf as his personal AI chatbot).
- Under no circumstances make up details that are not in this list. Always stick exactly to this factsheet!
- Format lists, emails, links, and code neatly in markdown.
`;

      const chatHistory = (history || []).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const chat = client.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: chatHistory,
      });

      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error: any) {
      console.error("Gemini API Error in Server:", error);
      res.status(500).json({ error: error.message || "Failed to query Gemini API" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

startServer().catch(console.error);
