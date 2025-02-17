import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4">Welcome to Your Dashboard</Typography>
      <Typography variant="body1">This is a protected page!</Typography>
    </Box>
  );
}
