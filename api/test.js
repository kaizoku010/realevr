export default function handler(req, res) {
  res.status(200).json({ 
    message: "API is working", 
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}