import React from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';
import { Formik } from 'formik';

import {
  Box,
  Heading,
  Card,
  Button,
  Text,
  Grid,
  GridItem,
} from '@t3n/components';

import CheckoutSection from './CheckoutSection';
import FormInput from './FormInput';
import FormGroup from './FormGroup';
import FormSelect from './FormSelect';

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

export interface CreditCardValues {
  cardname: string;
  cardnumber: string;
  cardtype: string;
  securitynumber: string;
  validmonth: string;
  validyear: string;
}

interface PaymentOptionInterface {
  value?: PAYMENT_OPTION;
  cardValues: CreditCardValues | null;
  onCardValuesChange: (values: CreditCardValues) => void;
  onSelect: (value?: PAYMENT_OPTION) => void;
  onSubmit: (value?: PAYMENT_OPTION) => void;
  inEditMode: boolean;
  onEditClick: () => void;
}

const PaymentOptionSelect = ({
  value,
  cardValues,
  onCardValuesChange,
  onSelect,
  onSubmit,
}: Pick<
  PaymentOptionInterface,
  'value' | 'cardValues' | 'onCardValuesChange' | 'onSelect' | 'onSubmit'
>) => {
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
          <Formik
            initialValues={
              cardValues || {
                cardname: '',
                cardnumber: '',
                cardtype: 'Mastercard',
                securitynumber: '',
                validmonth: '01',
                validyear: '2020',
              }
            }
            onSubmit={() => {}}
            validate={onCardValuesChange}
          >
            <Box>
              <FormGroup label="Kreditkarteninhaber" name="cardname">
                <FormInput type="text" name="cardname" />
              </FormGroup>
              <FormGroup label="Kreditkartennummer" name="cardnumber">
                <FormInput type="text" name="cardnumber" />
              </FormGroup>
              <FormGroup label="Kreditkarten-Typ" name="cardtype">
                <FormSelect name="cardtype">
                  <option>Mastercard</option>
                  <option>VISA</option>
                </FormSelect>
              </FormGroup>
              <FormGroup label="Sicherheitscode" name="securitynumber">
                <FormInput type="text" name="securitynumber" />
              </FormGroup>
              <Grid>
                <GridItem width={1 / 3}>
                  <FormGroup label="Gültigkeit" my={0} name="validmonth">
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
                    <FormGroup label="" my={0} name="validyear">
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
          </Formik>
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
  cardValues,
  onEditClick,
}: Pick<PaymentOptionInterface, 'value' | 'cardValues' | 'onEditClick'>) => (
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
        ) : value === 'PAYMENT_OPTION_CREDITCARD' ? (
          <Box>
            <Text bold>Kreditkarte</Text>
            <Text mb={0}>
              <Text inline bold>
                Kreditkarteninhaber:
              </Text>{' '}
              {cardValues?.cardname}
            </Text>
            <Text my={0}>
              <Text inline bold>
                Kreditkartennummer:
              </Text>{' '}
              {cardValues?.cardnumber}
            </Text>
            <Text my={0}>
              <Text inline bold>
                Kreditkarten-Typ:
              </Text>{' '}
              {cardValues?.cardtype}
            </Text>
            <Text my={0}>
              <Text inline bold>
                Sicherheitscode:
              </Text>{' '}
              {cardValues?.securitynumber}
            </Text>
            <Text my={0}>
              <Text inline bold>
                Gültigkeit:
              </Text>{' '}
              {cardValues?.validmonth}-{cardValues?.validyear}
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
  cardValues,
  onCardValuesChange,
  onSelect,
  onSubmit,
  inEditMode,
  onEditClick,
}: PaymentOptionInterface) => (
  <CheckoutSection>
    {inEditMode && (
      <PaymentOptionSelect
        value={value}
        cardValues={cardValues}
        onCardValuesChange={onCardValuesChange}
        onSelect={onSelect}
        onSubmit={onSubmit}
      />
    )}
    {!inEditMode && (
      <PaymentOptionOverview
        value={value}
        cardValues={cardValues}
        onEditClick={onEditClick}
      />
    )}
  </CheckoutSection>
);

export default PaymentOption;
