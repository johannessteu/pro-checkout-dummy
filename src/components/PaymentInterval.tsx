import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';

import {
  Box,
  Heading,
  Text,
  Card,
  FormGroup,
  Input,
  Button,
  Grid,
  GridItem,
} from '@t3n/components';

import CheckoutSection from './CheckoutSection';

export const DISCOUNTCODE_SUBSCRIBER10 = 'SUBSCRIBER10';
export const DISCOUNTCODE_SUBSCRIBER25 = 'SUBSCRIBER25';
export const discountCodes = [
  DISCOUNTCODE_SUBSCRIBER10,
  DISCOUNTCODE_SUBSCRIBER25,
];

const OptionRadioButton = styled.input.attrs({
  type: 'radio',
  readOnly: true,
})``;

const OptionCardContainer = styled(Card)`
  ${({ theme }) => color({ theme, bg: 'background.secondary' })}

  p, h5 {
    cursor: default;
  }
`;

const OptionCard: React.FC<{
  label: string;
  name: string;
  checked: boolean;
  onClick: () => void;
}> = ({ children, label, name, checked, onClick }) => (
  <OptionCardContainer onClick={onClick} elevate={checked}>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={2}
    >
      <Heading as="h5" styleAs="h3" my={0}>
        {label}
      </Heading>
      {children}
      <Box mt={4}>
        <OptionRadioButton name={name} checked={checked} />
      </Box>
    </Box>
  </OptionCardContainer>
);

export type PaymentIntervalType =
  | 'PAYMENT_INTERVAL_QUARTERLY'
  | 'PAYMENT_INTERVAL_YEARLY';

export const PAYMENT_INTERVAL_QUARTERLY = 'PAYMENT_INTERVAL_QUARTERLY';
export const PAYMENT_INTERVAL_YEARLY = 'PAYMENT_INTERVAL_YEARLY';

interface PaymentIntervalSelectInterface {
  value?: PaymentIntervalType;
  discountCode: string;
  onSelect: (value?: PaymentIntervalType) => void;
  onDiscountCodeChange: (value: string) => void;
  onSubmit: (value?: PaymentIntervalType) => void;
}

const PaymentIntervalSelect = ({
  value,
  discountCode,
  onDiscountCodeChange,
  onSelect,
  onSubmit,
}: PaymentIntervalSelectInterface) => {
  return (
    <Box>
      <Heading as="h3" mt={0}>
        Wie möchtest du zahlen?
      </Heading>
      <Grid>
        <GridItem width={1 / 2}>
          <OptionCard
            label="Quartal"
            name="paymentquarterly"
            checked={value === PAYMENT_INTERVAL_QUARTERLY}
            onClick={() => {
              onSelect(PAYMENT_INTERVAL_QUARTERLY);
            }}
          >
            <Text my={0}>49€ / Quartal</Text>
          </OptionCard>
        </GridItem>
        <GridItem width={1 / 2}>
          <OptionCard
            label="Jahr"
            name="paymentyearly"
            checked={value === PAYMENT_INTERVAL_YEARLY}
            onClick={() => {
              onSelect(PAYMENT_INTERVAL_YEARLY);
            }}
          >
            <Text my={0}>199€ / Jahr</Text>
          </OptionCard>
        </GridItem>
      </Grid>
      <Box mb={4}>
        <Text bold style={{ whiteSpace: 'nowrap' }} my={0} mr={2}>
          oder Rabattcode eingeben:
        </Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            onSubmit(value);
          }}
        >
          <Input
            type="text"
            name="discountcode"
            onChange={(e) => onDiscountCodeChange(e.currentTarget.value)}
          />
        </form>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={() => onSubmit(value)}>Weiter</Button>
      </Box>
    </Box>
  );
};

interface PaymentIntervalOverview
  extends Pick<PaymentIntervalSelectInterface, 'value' | 'discountCode'> {
  onEditClick: () => void;
}

const PaymentIntervalOverview = ({
  value,
  discountCode,
  onEditClick,
}: PaymentIntervalOverview) => (
  <Box>
    <Heading as="h3" mt={0}>
      Zahlungsinterval
    </Heading>
    {discountCode.toUpperCase() === DISCOUNTCODE_SUBSCRIBER10 ? (
      <Text>
        <Text inline bold>
          Jährlich (10% Rabatt)
        </Text>
        <br />
        180€ / Jahr
      </Text>
    ) : discountCode.toUpperCase() === DISCOUNTCODE_SUBSCRIBER25 ? (
      <Text>
        <Text inline bold>
          Jährlich (25% Rabatt)
        </Text>
        <br />
        250€ / Jahr
      </Text>
    ) : value === PAYMENT_INTERVAL_YEARLY ? (
      <Text>
        <Text inline bold>
          Jährlich
        </Text>
        <br />
        199€ / Jahr
      </Text>
    ) : PAYMENT_INTERVAL_QUARTERLY ? (
      <Text>
        <Text inline bold>
          Quartal
        </Text>
        <br />
        49€ / Quartal
      </Text>
    ) : (
      ''
    )}
    <Box display="flex" justifyContent="flex-end">
      <Button onClick={onEditClick} variant="secondary">
        Bearbeiten
      </Button>
    </Box>
  </Box>
);

const PaymentInterval = ({
  inEditMode,
  value,
  discountCode,
  onDiscountCodeChange,
  onSelect,
  onSubmit,
  onEditClick,
}: PaymentIntervalSelectInterface &
  Pick<PaymentIntervalOverview, 'onEditClick'> & { inEditMode: boolean }) => (
  <CheckoutSection>
    {inEditMode ? (
      <PaymentIntervalSelect
        value={value}
        discountCode={discountCode}
        onDiscountCodeChange={onDiscountCodeChange}
        onSelect={onSelect}
        onSubmit={onSubmit}
      />
    ) : (
      <PaymentIntervalOverview
        value={value}
        discountCode={discountCode}
        onEditClick={onEditClick}
      />
    )}
  </CheckoutSection>
);

export default PaymentInterval;
