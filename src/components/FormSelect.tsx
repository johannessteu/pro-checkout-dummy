import React, { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';
import { useField } from 'formik';
import { variant } from 'styled-system';

import { ThemeProps } from '@t3n/theme';

export const StyledFormSelect = styled.select`
  width: 100%;
  background: white;
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

const FormSelect = ({
  name,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) => {
  const [field] = useField(name || '');

  return <StyledFormSelect name={name} {...props} {...field} />;
};

export default FormSelect;
