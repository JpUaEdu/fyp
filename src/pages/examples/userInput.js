import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
 
export default function UserInput() {
  const [brand, setBrand] = useState("");
  const [figure, setFigure] = useState("");
  const history = useHistory();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, figure }),
      });
 
      const data = await res.json();
      console.log("Prediction API response:", data);
 
      // Save prediction + inputs
      localStorage.setItem(
        "prediction",
        JSON.stringify({ brand, figure, ...data })
      );
 
      // Navigate to dashboard
      history.push("/dashboard/prediction");
    } catch (err) {
      console.error("Error calling prediction API:", err);
      alert("Prediction request failed – check console");
    }
  };
 
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Partnership Prediction
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Brand"
            variant="outlined"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Figure"
            variant="outlined"
            value={figure}
            onChange={(e) => setFigure(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={!brand.trim() || !figure.trim()}
          >
            Predict
          </Button>
        </form>
      </Box>
    </Container>
  );
}
 