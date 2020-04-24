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

const OptionRadioButton = styled.input.attrs({ type: 'radio' })``;

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
  onSelect: (value?: PaymentIntervalType) => void;
  onSubmit: (value?: PaymentIntervalType) => void;
}

const PaymentIntervalSelect = ({
  value,
  onSelect,
  onSubmit,
}: PaymentIntervalSelectInterface) => {
  return (
    <Box>
      <Heading as="h3" mt={0}>
        Wie möchtest du zahlen?
      </Heading>
      <Grid mb={4}>
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
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={() => onSubmit(value)}>Weiter</Button>
      </Box>
    </Box>
  );
};

interface PaymentIntervalOverview
  extends Pick<PaymentIntervalSelectInterface, 'value'> {
  onEditClick: () => void;
}

const PaymentIntervalOverview = ({
  value,
  onEditClick,
}: PaymentIntervalOverview) => (
  <Box>
    <Heading as="h3" mt={0}>
      Zahlungsinterval
    </Heading>
    {value === PAYMENT_INTERVAL_YEARLY ? (
      <Text bold>Jährlich</Text>
    ) : PAYMENT_INTERVAL_QUARTERLY ? (
      <Text bold>Monatlich</Text>
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
  onSelect,
  onSubmit,
  onEditClick,
}: PaymentIntervalSelectInterface &
  Pick<PaymentIntervalOverview, 'onEditClick'> & { inEditMode: boolean }) => (
  <CheckoutSection>
    {inEditMode ? (
      <PaymentIntervalSelect
        value={value}
        onSelect={onSelect}
        onSubmit={onSubmit}
      />
    ) : (
      <PaymentIntervalOverview value={value} onEditClick={onEditClick} />
    )}
  </CheckoutSection>
);

export default PaymentInterval;
