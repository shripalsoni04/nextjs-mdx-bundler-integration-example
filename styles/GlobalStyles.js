import { createGlobalStyle } from "styled-components";
import 'highlight.js/styles/atom-one-dark.css';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

  a:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

export default GlobalStyles;