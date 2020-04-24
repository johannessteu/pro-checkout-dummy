import React, { useState } from 'react';

import {
  Box,
  Heading,
  FormGroup,
  Input,
  Button,
  Grid,
  GridItem,
  Checkbox,
} from '@t3n/components';

import CheckoutSection from './CheckoutSection';
import FormSelect from './FormSelect';
import { countries } from '../lib/countries';

const ContactForm = () => (
  <Box>
    <FormGroup label="Firma" my={0} mb={4}>
      <Input type="text" name="company" />
    </FormGroup>
    <Grid mb={4}>
      <GridItem width={1 / 2}>
        <FormGroup label="Vorname" my={0}>
          <Input type="text" name="fname" />
        </FormGroup>
      </GridItem>
      <GridItem width={1 / 2}>
        <FormGroup label="Nachname" my={0}>
          <Input type="text" name="lname" />
        </FormGroup>
      </GridItem>
    </Grid>
    <FormGroup label="Zusätzliche Adresszeile" my={0} mb={4}>
      <Input type="text" name="additional" />
    </FormGroup>
    <Grid mb={4}>
      <GridItem width={3 / 4}>
        <FormGroup label="Straße" my={0}>
          <Input type="text" name="street" />
        </FormGroup>
      </GridItem>
      <GridItem width={1 / 4}>
        <FormGroup label="Nr." my={0}>
          <Input type="text" name="streetnumber" />
        </FormGroup>
      </GridItem>
    </Grid>
    <Grid mb={4}>
      <GridItem width={1 / 4}>
        <FormGroup label="Postleitzahl" my={0}>
          <Input type="text" name="postcode" />
        </FormGroup>
      </GridItem>
      <GridItem width={3 / 4}>
        <FormGroup label="Stadt" my={0}>
          <Input type="text" name="city" />
        </FormGroup>
      </GridItem>
    </Grid>
    <FormGroup label="Land" my={0}>
      <FormSelect name="country">
        {countries.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </FormSelect>
    </FormGroup>
  </Box>
);

const ContactDetails = () => {
  const [additionalAddress, setAdditionalAddress] = useState(false);

  return (
    <CheckoutSection>
      <Box>
        <Heading as="h3" mt={0}>
          Lege deine Rechnungs- und Lieferadresse fest:
        </Heading>
        <ContactForm />
        <Box my={4}>
          <Checkbox
            label="Abweichende Lieferadresse"
            value="different-address"
            checked={additionalAddress}
            onChange={() => setAdditionalAddress(!additionalAddress)}
            name=""
          />
        </Box>
        {additionalAddress && (
          <Box mb={4}>
            <Heading as="h3">Lieferadresse:</Heading>
            <ContactForm />
          </Box>
        )}
        <Box display="flex" justifyContent="flex-end">
          <Button>Weiter</Button>
        </Box>
      </Box>
    </CheckoutSection>
  );
};

export default ContactDetails;
