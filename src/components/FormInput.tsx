import React from 'react';
import { useField, useFormikContext } from 'formik';

import { Input } from '@t3n/components';
import { InputProps } from '@t3n/components/src/Input/Input';

const WrappedInput = ({
  name,
  ...props
}: { name: string } & Omit<InputProps, 'name'>) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  const handleReset = () => {
    setFieldValue(name, '');
  };

  return (
    <Input
      name={name}
      {...field}
      {...props}
      onReset={handleReset}
      error={!!(meta.touched && meta.error)}
    />
  );
};

export default WrappedInput;
