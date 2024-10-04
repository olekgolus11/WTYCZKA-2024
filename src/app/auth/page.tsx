"use client";

import { useState } from 'react';
import { TextField, Typography, Button } from "@mui/material";

const AuthPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = '/participant';
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 h-screen">
      <Typography variant="h6">Wprowadź hasło</Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          helperText={error ? "Złe hasło" : ""}
        />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </div>
  );
}

export default AuthPage;
