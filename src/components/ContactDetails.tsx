import React, { useState } from 'react';
import { Formik, FormikProps } from 'formik';

import {
  Box,
  Heading,
  // FormGroup,
  // Input,
  Button,
  Grid,
  GridItem,
  Checkbox,
  Text,
} from '@t3n/components';

import CheckoutSection from './CheckoutSection';
// import { StyledFormSelect as FormSelect } from './FormSelect';
import FormGroup from './FormGroup';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { countries } from '../lib/countries';

export interface ContactFormValues {
  company: string;
  firstName: string;
  lastName: string;
  suffix: string;
  street: string;
  streetNumber: string;
  postCode: string;
  city: string;
  country: string;
}

interface ContactFormInterface {
  initialValues: ContactFormValues | null;
  onChange: (values: ContactFormValues) => void;
}

const ContactForm = ({ initialValues, onChange }: ContactFormInterface) => (
  <Formik<ContactFormValues>
    initialValues={
      initialValues || {
        company: '',
        firstName: '',
        lastName: '',
        suffix: '',
        street: '',
        streetNumber: '',
        postCode: '',
        city: '',
        country: 'Deutschland',
      }
    }
    onSubmit={() => {}}
    validate={onChange}
  >
    <Box>
      <FormGroup label="Firma" name="company" my={0} mb={4}>
        <FormInput type="text" name="company" />
      </FormGroup>
      <Grid mb={4}>
        <GridItem width={1 / 2}>
          <FormGroup label="Vorname" name="firstName" my={0}>
            <FormInput type="text" name="firstName" />
          </FormGroup>
        </GridItem>
        <GridItem width={1 / 2}>
          <FormGroup label="Nachname" name="lastName" my={0}>
            <FormInput type="text" name="lastName" />
          </FormGroup>
        </GridItem>
      </Grid>
      <FormGroup label="Adresszusatz" name="suffix" my={0} mb={4}>
        <FormInput type="text" name="suffix" />
      </FormGroup>
      <Grid mb={4}>
        <GridItem width={3 / 4}>
          <FormGroup label="Straße" name="street" my={0}>
            <FormInput type="text" name="street" />
          </FormGroup>
        </GridItem>
        <GridItem width={1 / 4}>
          <FormGroup label="Nr." name="streetNumber" my={0}>
            <FormInput type="text" name="streetNumber" />
          </FormGroup>
        </GridItem>
      </Grid>
      <Grid mb={4}>
        <GridItem width={1 / 4}>
          <FormGroup label="Postleitzahl" name="postCode" my={0}>
            <FormInput type="text" name="postCode" />
          </FormGroup>
        </GridItem>
        <GridItem width={3 / 4}>
          <FormGroup label="Stadt" name="city" my={0}>
            <FormInput type="text" name="city" />
          </FormGroup>
        </GridItem>
      </Grid>
      <FormGroup label="Land" name="country" my={0}>
        <FormSelect name="country">
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </FormSelect>
      </FormGroup>
    </Box>
  </Formik>
);

interface ContactDetailsEditInterface {
  address: ContactFormValues | null;
  alternateAddress: ContactFormValues | null;
  onSubmit: (
    address: ContactFormValues | null,
    alternateAddress: ContactFormValues | null
  ) => void;
  onChange: (
    address: ContactFormValues | null,
    alternateAddress: ContactFormValues | null
  ) => void;
  useAlternateAddress: boolean;
  onUseAlternateAddressToggle: () => void;
}

const ContactDetailsEdit = ({
  address,
  alternateAddress,
  onSubmit,
  onChange,
  useAlternateAddress,
  onUseAlternateAddressToggle,
}: ContactDetailsEditInterface) => {
  return (
    <Box>
      <Heading as="h3" mt={0}>
        Lege deine Rechnungs- und Lieferadresse fest:
      </Heading>
      <ContactForm
        initialValues={address}
        onChange={(newValues) => onChange(newValues, null)}
      />
      <Box my={4}>
        <Checkbox
          label="Abweichende Lieferadresse"
          value="different-address"
          checked={useAlternateAddress}
          onChange={onUseAlternateAddressToggle}
          name=""
        />
      </Box>
      {useAlternateAddress && (
        <Box mb={4}>
          <Heading as="h3">Lieferadresse:</Heading>
          <ContactForm
            initialValues={alternateAddress}
            onChange={(newValues) => onChange(null, newValues)}
          />
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={() => onSubmit(address, alternateAddress)}>
          Weiter
        </Button>
      </Box>
    </Box>
  );
};

const ContactDetailsOverviewAddress = (address: ContactFormValues) => (
  <Box>
    {address.company && (
      <Text my={0}>
        <Text inline bold>
          Firma:
        </Text>{' '}
        {address.company}
      </Text>
    )}
    <Text my={0}>
      <Text inline bold>
        Name:
      </Text>{' '}
      {address.firstName} {address.lastName}
    </Text>
    {address.suffix && (
      <Text my={0}>
        <Text inline bold>
          Adresszusatz:
        </Text>{' '}
        {address.suffix}
      </Text>
    )}
    <Text my={0}>
      <Text inline bold>
        Straße:
      </Text>{' '}
      {address.street} {address.streetNumber}
    </Text>
    <Text my={0}>
      <Text inline bold>
        Stadt:
      </Text>{' '}
      {address.postCode} {address.city}
    </Text>
    <Text my={0}>
      <Text inline bold>
        Land:
      </Text>{' '}
      {address.country}
    </Text>
  </Box>
);

const ContactDetailsOverview = ({
  address,
  alternateAddress,
  useAlternateAddress,
  onEditClick,
}: Pick<
  ContactDetailsEditInterface,
  'address' | 'alternateAddress' | 'useAlternateAddress'
> & {
  onEditClick: () => void;
}) => (
  <Box opacity={!address ? 0.4 : 1}>
    <Heading as="h3" my={0}>
      Rechnungs- & Lieferadresse
    </Heading>
    {address && (
      <Grid>
        <GridItem width={1 / 2}>
          <Text bold>Rechnungsadresse:</Text>
          <ContactDetailsOverviewAddress {...address} />
        </GridItem>
        <GridItem width={1 / 2}>
          <Text bold>Lieferadresse:</Text>
          {useAlternateAddress && alternateAddress ? (
            <ContactDetailsOverviewAddress {...alternateAddress} />
          ) : (
            <Text secondary>Wie Rechnungsadresse</Text>
          )}
        </GridItem>
      </Grid>
    )}
    {address && (
      <Box display="flex" justifyContent="flex-end">
        <Button variant="secondary" onClick={onEditClick}>
          Bearbeiten
        </Button>
      </Box>
    )}
  </Box>
);

const ContactDetails = ({
  address,
  alternateAddress,
  onSubmit,
  onChange,
  useAlternateAddress,
  onUseAlternateAddressToggle,
  inEditMode,
  onEditClick,
}: ContactDetailsEditInterface & {
  inEditMode: boolean;
  onEditClick: () => void;
}) => (
  <CheckoutSection>
    {inEditMode ? (
      <ContactDetailsEdit
        address={address}
        alternateAddress={alternateAddress}
        onSubmit={onSubmit}
        onChange={onChange}
        useAlternateAddress={useAlternateAddress}
        onUseAlternateAddressToggle={onUseAlternateAddressToggle}
      />
    ) : (
      <ContactDetailsOverview
        address={address}
        alternateAddress={alternateAddress}
        useAlternateAddress={useAlternateAddress}
        onEditClick={onEditClick}
      />
    )}
  </CheckoutSection>
);

export default ContactDetails;
