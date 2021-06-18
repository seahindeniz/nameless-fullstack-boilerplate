import baseStyled, { ThemedStyledInterface } from 'styled-components';

const theme = {
  colors: {},
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

export default theme;
