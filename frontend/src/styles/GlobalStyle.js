import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background-color: #f5f5f5;
    color: #333;
  }

  h1, h2, h3 {
    color: #1E90FF;
  }
`;

export default GlobalStyle;
