import baseStyled, { ThemedStyledInterface } from 'styled-components';

const theme = {
  colors: {},
};

export type StyledThemeType = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<StyledThemeType>;

export default theme;
