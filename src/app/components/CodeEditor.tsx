import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import Editor, { OnChange } from "@monaco-editor/react";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("// Start coding here...");

  const handleEditorChange: OnChange = (value) => {
    setCode(value || "");
  };

  const runCode = () => {
    console.log("Running code:", code);
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Code Editor
          </Typography>
          <Button color="inherit" onClick={runCode}>
            Run
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{ border: "1px solid #333", borderRadius: 1, overflow: "hidden" }}
        >
          <Editor
            height="70vh"
            defaultLanguage="javascript"
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default CodeEditor;
