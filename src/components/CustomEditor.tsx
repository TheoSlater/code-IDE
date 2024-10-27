import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Box,
  styled,
} from "@mui/material";
import { invoke } from "@tauri-apps/api/core";

const EditorContainer = styled(Container)(() => ({
  bgcolor: "#1e1e1e",
  color: "#d4d4d4",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const StyledAppBar = styled(AppBar)(() => ({
  bgcolor: "#333",
  padding: "0.5rem",
}));

const TerminalInput = styled(TextField)(() => ({
  width: "100%",
  bgcolor: "#1e1e1e",
  color: "#d4d4d4",
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontFamily: "Consolas, 'Courier New', monospace",
  "& .MuiOutlinedInput-root": {
    padding: "0.5rem",
    "& fieldset": {
      borderColor: "transparent",
    },
  },
}));

const CustomEditor = () => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  const handleExecuteCommand = async () => {
    try {
      // Run command using Tauri's invoke function
      const result = await invoke<string>("run_command", { command });

      // Append new output to the terminal display
      setOutput((prevOutput) => prevOutput + "\n" + result);
      setCommand(""); // Clear input after execution
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setOutput((prevOutput) => prevOutput + "\nError: " + errorMessage);
    }
  };

  return (
    <EditorContainer maxWidth="md">
      <StyledAppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: "Consolas, 'Courier New', monospace",
              color: "#d4d4d4",
            }}
          >
            Terminal
          </Typography>
        </Toolbar>
      </StyledAppBar>

      {/* Output Display */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#000",
          color: "#00ff00",
          padding: "1rem",
          overflowY: "auto",
          fontFamily: "Consolas, 'Courier New', monospace",
        }}
      >
        <pre>{output}</pre>
      </Box>

      {/* Input Field */}
      <TerminalInput
        variant="outlined"
        placeholder="Enter command..."
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleExecuteCommand();
          }
        }}
      />
    </EditorContainer>
  );
};

export default CustomEditor;
