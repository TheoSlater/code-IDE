import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Call the Tauri command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Tauri + React
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 2 }}>
        <Link href="https://vitejs.dev" target="_blank">
          <img
            src="/vite.svg"
            className="logo vite"
            alt="Vite logo"
            width={80}
          />
        </Link>
        <Link href="https://tauri.app" target="_blank">
          <img
            src="/tauri.svg"
            className="logo tauri"
            alt="Tauri logo"
            width={80}
          />
        </Link>
        <Link href="https://reactjs.org" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
            width={80}
          />
        </Link>
      </Box>

      <Typography variant="body1" gutterBottom>
        Click on the Tauri, Vite, and React logos to learn more.
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
        style={{ marginTop: "1rem" }}
      >
        <TextField
          id="greet-input"
          label="Enter a name..."
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Greet
        </Button>
      </form>

      {greetMsg && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {greetMsg}
        </Typography>
      )}
    </Container>
  );
}

export default App;
