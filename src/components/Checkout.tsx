import React, { useState } from 'react';

import { Box } from '@t3n/components';

import PaymentInterval, { PaymentIntervalType } from './PaymentInterval';
import ContactDetails from './ContactDetails';
import PaymentOption from './PaymentOption';

const CheckoutContainer: React.FC = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    padding={4}
  >
    {children}
  </Box>
);

const Checkout = () => {
  const [paymentInterval, setPaymentInterval] = useState<
    PaymentIntervalType | undefined
  >();
  const [editPaymentInterval, setEditPaymentInterval] = useState(true);

  return (
    <CheckoutContainer>
      <PaymentInterval
        value={paymentInterval}
        inEditMode={editPaymentInterval}
        onSelect={(value) => setPaymentInterval(value)}
        onSubmit={() => setEditPaymentInterval(false)}
        onEditClick={() => setEditPaymentInterval(true)}
      />
      <ContactDetails />
      <PaymentOption />
    </CheckoutContainer>
  );
};

export default Checkout;
