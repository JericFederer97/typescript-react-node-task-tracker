//* Overrides default theme values
import { createTheme } from "@mui/material";
//* Gives type safety while creating mui theme
import { ThemeOptions } from "@mui/material";

//* Contains properties you want to override in the default theme
export const customTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: 'rgba(168, 85, 247, 0.80)',
            main: 'rgba(168, 85, 247, 0.65)',
            dark: 'rgba(168, 85, 247, 0.28)',
        },
        background: {
            paper: '#151515',
            default: 'rgba(0, 0, 0, 0.96)',
        }
    }
});