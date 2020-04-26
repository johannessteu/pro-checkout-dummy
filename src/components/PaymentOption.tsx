import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';

import {
  Box,
  Heading,
  Card,
  FormGroup,
  Input,
  Button,
  Text,
  Grid,
  GridItem,
} from '@t3n/components';

import CheckoutSection from './CheckoutSection';
import { StyledFormSelect as FormSelect } from './FormSelect';

const OptionRadioButton = styled.input.attrs({
  type: 'radio',
  readOnly: true,
})``;

const OptionCardContainer = styled(Card)`
  ${({ theme }) => color({ theme, bg: 'background.secondary' })}

  > div:first-child p {
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
    <Box display="flex" alignItems="center">
      <OptionRadioButton name={name} checked={checked} />
      <Text bold m={0} ml={2}>
        {label}
      </Text>
    </Box>
    {children}
  </OptionCardContainer>
);

export type PAYMENT_OPTION =
  | 'PAYMENT_OPTION_PAYPAL'
  | 'PAYMENT_OPTION_CREDITCARD';

export const PAYMENT_OPTION_PAYPAL = 'PAYMENT_OPTION_PAYPAL';
export const PAYMENT_OPTION_CREDITCARD = 'PAYMENT_OPTION_CREDITCARD';

interface PaymentOptionInterface {
  value?: PAYMENT_OPTION;
  onSelect: (value?: PAYMENT_OPTION) => void;
  onSubmit: (value?: PAYMENT_OPTION) => void;
  inEditMode: boolean;
  onEditClick: () => void;
}

const PaymentOptionSelect = ({
  value,
  onSelect,
  onSubmit,
}: Pick<PaymentOptionInterface, 'value' | 'onSelect' | 'onSubmit'>) => {
  return (
    <Box>
      <Heading as="h3" mt={0}>
        Womit möchtest du zahlen?
      </Heading>
      <OptionCard
        label="PayPal"
        name="paymentoption"
        checked={value === 'PAYMENT_OPTION_PAYPAL'}
        onClick={() => onSelect('PAYMENT_OPTION_PAYPAL')}
      >
        {value === 'PAYMENT_OPTION_PAYPAL' && (
          <Text mb={0} secondary>
            Du wirst nach erfolgreicher Bestellung zu PayPal weitergeleitet.
          </Text>
        )}
      </OptionCard>
      <OptionCard
        label="Kreditkarte"
        name="paymentoption"
        checked={value === 'PAYMENT_OPTION_CREDITCARD'}
        onClick={() => onSelect('PAYMENT_OPTION_CREDITCARD')}
      >
        {value === 'PAYMENT_OPTION_CREDITCARD' && (
          <Box>
            <FormGroup label="Kreditkarteninhaber">
              <Input type="text" name="cardname" />
            </FormGroup>
            <FormGroup label="Kreditkartennummer">
              <Input type="text" name="cardnumber" />
            </FormGroup>
            <FormGroup label="Kreditkarten-Typ">
              <FormSelect name="cardtype">
                <option>Mastercard</option>
                <option>VISA</option>
              </FormSelect>
            </FormGroup>
            <FormGroup label="Sicherheitscode">
              <Input type="text" name="securitynumber" />
            </FormGroup>
            <Grid>
              <GridItem width={1 / 3}>
                <FormGroup label="Gültigkeit" my={0}>
                  <FormSelect name="validmonth">
                    {Array(12)
                      .fill(0)
                      .map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={`validmonth-${i + 1}`}>
                          {i + 1 < 10 ? 0 : ''}
                          {i + 1}
                        </option>
                      ))}
                  </FormSelect>
                </FormGroup>
              </GridItem>
              <GridItem width={2 / 3}>
                <Box pt="19px">
                  <FormGroup label="" my={0}>
                    <FormSelect name="validyear">
                      {Array(11)
                        .fill(0)
                        .map((_, i) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={`validyear-${i}`}>
                            {new Date().getFullYear() + i}
                          </option>
                        ))}
                    </FormSelect>
                  </FormGroup>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        )}
      </OptionCard>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={() => onSubmit(value)}>Weiter</Button>
      </Box>
    </Box>
  );
};

const PaymentOptionOverview = ({
  value,
  onEditClick,
}: Pick<PaymentOptionInterface, 'value' | 'onEditClick'>) => (
  <Box opacity={!value ? 0.4 : 1}>
    <Heading as="h3" my={0}>
      Zahlungsart
    </Heading>
    {value && (
      <Box>
        {value === 'PAYMENT_OPTION_PAYPAL' ? (
          <Box>
            <Text bold mb={0}>
              PayPal
            </Text>
            <Text mt={0} secondary>
              Du wirst nach erfolgreicher Bestellung zu PayPal weitergeleitet.
            </Text>
          </Box>
        ) : null}
        <Box display="flex" justifyContent="flex-end">
          <Button variant="secondary" onClick={onEditClick}>
            Bearbeiten
          </Button>
        </Box>
      </Box>
    )}
  </Box>
);

const PaymentOption = ({
  value,
  onSelect,
  onSubmit,
  inEditMode,
  onEditClick,
}: PaymentOptionInterface) => (
  <CheckoutSection>
    {inEditMode && (
      <PaymentOptionSelect
        value={value}
        onSelect={onSelect}
        onSubmit={onSubmit}
      />
    )}
    {!inEditMode && (
      <PaymentOptionOverview value={value} onEditClick={onEditClick} />
    )}
  </CheckoutSection>
);

export default PaymentOption;
