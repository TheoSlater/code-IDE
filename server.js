import express from "express";
import next from "next";
import bodyParser from "body-parser";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Middleware to parse JSON requests
  server.use(bodyParser.json());

  // Function to execute code based on the language
  const executeCode = async (code, language) => {
    // Implement your execution logic here
    // This is a placeholder for demonstration
    if (language === "javascript") {
      return eval(code); // WARNING: eval can execute any JS code, be cautious
    } else if (language === "python") {
      // Implement your Python code execution logic here
      return "Python code executed"; // Mock response
    }
    throw new Error("Unsupported language");
  };

  // API route to execute code
  server.post("/api/execute", async (req, res) => {
    const { code, language } = req.body;

    console.log(`Executing ${language} code:\n${code}`); // Debugging output

    try {
      const output = await executeCode(code, language);
      res.json({ output });
    } catch (error) {
      console.error("Error executing code:", error); // Log the error
      res.status(500).json({ error: "Error executing code" });
    }
  });

  // Handle all other requests with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
