import React from 'react';
import { useField } from 'formik';

import { FormGroup } from '@t3n/components';
import { FormGroupProps } from '@t3n/components/src/FormGroup/FormGroup';

const WrappedFormGroup = ({
  name,
  children,
  ...props
}: { name: string } & FormGroupProps) => {
  const [, meta] = useField(name);

  return (
    <FormGroup
      {...props}
      errorMessage={meta.touched && meta.error ? meta.error : ''}
    >
      {children}
    </FormGroup>
  );
};

export default WrappedFormGroup;
