import { createGlobalStyle } from 'styled-components';
import { color } from 'styled-system';

const CheckoutGlobalStyle = createGlobalStyle`
  html, body {
    ${({ theme }) => color({ theme, bg: 'background.secondary' })}
  }
`;

export default CheckoutGlobalStyle;
