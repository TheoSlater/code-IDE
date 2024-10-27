import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Container,
} from "@mui/material";

const CustomEditor = () => {
  const [content, setContent] = useState("");

  return (
    <Container
      maxWidth="md"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        height: "100vh",
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        sx={{ bgcolor: "#333", padding: "0.5rem" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontFamily: "monospace", color: "#fff" }}
          >
            My Custom Editor
          </Typography>
        </Toolbar>
      </AppBar>

      <TextField
        multiline
        rows={20}
        variant="outlined"
        placeholder="Start typing your code here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        sx={{
          mt: 2,
          bgcolor: "#1e1e1e",
          color: "#ffffff",
          fontFamily: "monospace",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#444",
            },
            "&:hover fieldset": {
              borderColor: "#555",
            },
          },
          "& textarea": {
            color: "#ffffff",
            lineHeight: "1.5rem",
          },
        }}
      />
    </Container>
  );
};

export default CustomEditor;
