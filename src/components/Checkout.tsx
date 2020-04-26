import React, { useState } from 'react';

import { Box, Button } from '@t3n/components';

import PaymentInterval, { PaymentIntervalType } from './PaymentInterval';
import ContactDetails, { ContactFormValues } from './ContactDetails';
import PaymentOption, {
  PAYMENT_OPTION,
  // PAYMENT_OPTION_CREDITCARD,
  // PAYMENT_OPTION_PAYPAL,
  CreditCardValues,
} from './PaymentOption';

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
  // Payment Interval
  const [paymentInterval, setPaymentInterval] = useState<
    PaymentIntervalType | undefined
  >();
  const [editPaymentInterval, setEditPaymentInterval] = useState(true);

  // Contact Details
  const [address, setAddress] = useState<ContactFormValues | null>(null);
  const [
    alternateAddress,
    setAlternateAddress,
  ] = useState<ContactFormValues | null>(null);
  const [useAlternateAddress, setUseAlternateAddress] = useState(false);
  const [editContactDetails, setEditContactDetails] = useState(false);

  // Payment Option
  const [paymentOption, setPaymentOption] = useState<
    PAYMENT_OPTION | undefined
  >();
  const [cardValues, setCardValues] = useState<CreditCardValues | null>(null);
  const [editPaymentOption, setEditPaymentOption] = useState(false);

  return (
    <CheckoutContainer>
      <PaymentInterval
        value={paymentInterval}
        inEditMode={editPaymentInterval}
        onSelect={(value) => setPaymentInterval(value)}
        onSubmit={() => {
          setEditPaymentInterval(false);

          if (!address) setEditContactDetails(true);
        }}
        onEditClick={() => {
          setEditContactDetails(false);
          setEditPaymentOption(false);

          setEditPaymentInterval(true);
        }}
      />
      <ContactDetails
        address={address}
        alternateAddress={alternateAddress}
        useAlternateAddress={useAlternateAddress}
        onUseAlternateAddressToggle={() =>
          setUseAlternateAddress(!useAlternateAddress)
        }
        onChange={(newAddress, newAlternateAddress) => {
          if (newAddress) setAddress(newAddress);
          if (newAlternateAddress) setAlternateAddress(newAlternateAddress);
        }}
        onSubmit={() => {
          setEditContactDetails(false);

          if (!paymentOption) setEditPaymentOption(true);
        }}
        inEditMode={editContactDetails}
        onEditClick={() => {
          setEditPaymentInterval(false);
          setEditPaymentInterval(false);

          setEditContactDetails(true);
        }}
      />
      <PaymentOption
        value={paymentOption}
        cardValues={cardValues}
        onCardValuesChange={setCardValues}
        onSelect={setPaymentOption}
        onSubmit={() => {
          setEditPaymentOption(false);
        }}
        inEditMode={editPaymentOption}
        onEditClick={() => {
          setEditPaymentInterval(false);
          setEditContactDetails(false);

          setEditPaymentOption(true);
        }}
      />
      {paymentInterval &&
      address &&
      paymentOption &&
      !editPaymentInterval &&
      !editContactDetails &&
      !editPaymentOption ? (
        <Box width={[1, 1, '48rem']} display="flex" justifyContent="flex-end">
          <Button>Bestätigen</Button>
        </Box>
      ) : null}
    </CheckoutContainer>
  );
};

export default Checkout;
