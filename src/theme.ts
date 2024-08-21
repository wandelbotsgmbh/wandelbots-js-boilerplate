"use client"

import { createTheme, type ThemeOptions } from "@mui/material/styles"

export const colors = {
  buttonblue: "#2AC0FA",
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: colors.buttonblue,
    },
  },
  typography: {
    allVariants: {
      color: "#18181B",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          color: "#101629",
          fontWeight: "bold",
          minWidth: "261px",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            color: "white",
            backgroundColor: "#ffffff35",
            "&:hover": {
              backgroundColor: "darkgray",
            },
            border: "2px solid #ffffff50",
          },
        },
      ],
    },
  },
}

export const theme = createTheme(themeOptions)

export const darkTheme = createTheme({
  ...themeOptions,
  palette: {
    mode: "dark",
  },
})
