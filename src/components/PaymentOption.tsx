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
import FormSelect from './FormSelect';

const OptionRadioButton = styled.input.attrs({ type: 'radio' })``;

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

const PaymentOption = () => {
  const [paymentOption, setPaymentOption] = useState('');

  return (
    <CheckoutSection>
      <Box>
        <Heading as="h3" mt={0}>
          Zahlart:
        </Heading>
        <OptionCard
          label="PayPal"
          name="paymentoption"
          checked={paymentOption === 'PAYPAL'}
          onClick={() => setPaymentOption('PAYPAL')}
        >
          {paymentOption === 'PAYPAL' && (
            <Text mb={0} secondary>
              Du wirst nach erfolgreicher Bestellung zu PayPal weitergeleitet.
            </Text>
          )}
        </OptionCard>
        <OptionCard
          label="Kreditkarte"
          name="paymentoption"
          checked={paymentOption === 'CREDITCARD'}
          onClick={() => setPaymentOption('CREDITCARD')}
        >
          {paymentOption === 'CREDITCARD' && (
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
          <Button>Weiter</Button>
        </Box>
      </Box>
    </CheckoutSection>
  );
};

export default PaymentOption;
