import React from 'react';
import { Card } from '@t3n/components';

const CheckoutSection: React.FC = ({ children }) => (
  <Card width={[1, 1, '48rem']} big>
    {children}
  </Card>
);

export default CheckoutSection;
