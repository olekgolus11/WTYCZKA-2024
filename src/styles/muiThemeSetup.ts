"use client";
import { createTheme } from "@mui/material";

const MuiSetup = {
  palette: {
    primary: {
      main: "#ff4dcc",
    },
    secondary: {
      main: "#000000",
    },
    success: {
      main: "#ff4dcc",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "#ffffff",
            },
            "&:hover fieldset": {
              borderColor: "#ffffff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#b30080",
            },
            "& .MuiInputBase-icon": {
              color: "#ffffff",
            },
          },
          "& .MuiInputBase-input": {
            color: "#ffffff",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "& .MuiInputBase-input": {
            color: "#ffffff",
          },
          "& .MuiSelect-icon": {
            color: "#ffffff",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "& .MuiSvgIcon-root": {
            fontSize: "30px",
          },
        },
      },
    },
  },
};

export const theme = createTheme(MuiSetup);
