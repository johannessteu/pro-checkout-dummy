import React from 'react';

import { Box, Heading, Card, FormGroup, Input, Button } from '@t3n/components';

const Login = ({ onSubmit }: { onSubmit: () => void }) => (
  <Card width={[1, 1, '24rem']} big>
    <Box>
      <Heading my={0}>Melde dich an:</Heading>
      <FormGroup label="E-Mail-Adresse">
        <Input type="email" name="email" />
      </FormGroup>
      <FormGroup label="Passwort">
        <Input type="password" name="password" />
      </FormGroup>
      <Button type="submit" width={1} onClick={onSubmit}>
        Anmelden
      </Button>
    </Box>
  </Card>
);

export default Login;
