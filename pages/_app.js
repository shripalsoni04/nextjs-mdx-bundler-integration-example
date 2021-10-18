import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import { defaultTheme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default MyApp
