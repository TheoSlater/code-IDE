"use client";

import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
} from "@mui/material";
import Editor, { OnChange } from "@monaco-editor/react";
import { SelectChangeEvent } from "@mui/material";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("// Start coding here...");
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditorChange: OnChange = (value) => {
    setCode(value || "");
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setSelectedLanguage(event.target.value);
  };

  const runCode = async () => {
    if (!code.trim()) {
      setOutput("Please enter some code to run.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language: selectedLanguage }),
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Get the error response
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorResponse.error}`
        );
      }

      const result = await response.json();
      console.log("Execution Result:", result); // Debugging line
      setOutput(result.output); // Set the output state to display the result
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput(`Error executing code: ${error}`); // Display detailed error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Code Editor
          </Typography>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            displayEmpty
          >
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
          <Button color="inherit" onClick={runCode} disabled={loading}>
            {loading ? "Running..." : "Run"}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{ border: "1px solid #333", borderRadius: 1, overflow: "hidden" }}
        >
          <Editor
            height="70vh"
            language={selectedLanguage} // Dynamically set the language
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Output:</Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {output}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CodeEditor;
