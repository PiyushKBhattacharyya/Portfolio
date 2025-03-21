import type { Express } from "express";
import { createServer, type Server } from "http";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body as ContactMessage;
      
      // Validate input
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      if (message.length < 10) {
        return res.status(400).json({ message: 'Message must be at least 10 characters long' });
      }
      
      // In a real app, this would store the message or send an email
      console.log('Contact message received:', { name, email, message });
      
      // Return success response
      return res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
