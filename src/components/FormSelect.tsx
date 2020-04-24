import styled from 'styled-components';
import { color, variant } from 'styled-system';

import { ThemeProps } from '@t3n/theme';

const FormSelect = styled.select`
  width: 100%;
  ${({ theme }: ThemeProps) => color({ theme, bg: 'background.primary' })}
  border-radius: ${({ theme }: ThemeProps) => theme.border.radii[1]};
  border: 1px solid ${({ theme }: ThemeProps) => theme.colors.shades.grey143};
  ${({ theme }: ThemeProps) =>
    variant({
      variants: {
        default: {
          ...theme.textStyles.regular,
        },
      },
    })({ theme, variant: 'default' })}
  height: 40px;

  &:focus {
    outline: 0;
  }
`;

export default FormSelect;
