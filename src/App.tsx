import * as React from 'react';

import Checkout from './components/Checkout';
// import {
//   VisualSection,
//   H1,
//   Box,
//   PageLayout,
//   Section,
//   Text,
//   Checkbox,
//   Button,
//   Card,
//   Center,
//   Input,
//   FormGroup,
//   GridItem,
//   Grid,
// } from '@t3n/components';
// import styled from 'styled-components';

// const AdminBox = styled(Box)`
//   position: absolute;
//   bottom: 0;
//   z-index: 200;
//   background-color: white;
//   width: 300px;
//   left: 45%;
//   border: 2px solid black;
//   padding: 5px;
// `;

// const Checkout: React.FC<{ setCrm: (v: boolean) => void; isCrm: boolean }> = ({
//   setCrm,
//   isCrm,
// }) => {
//   const [selectedProduct, setSelectedProduct] = React.useState<
//     'none' | 'quartal' | 'jahr'
//   >('none');

//   return (
//     <>
//       <Section>
//         {selectedProduct === 'none' ? (
//           <>
//             <Text>Hello hier ist Philip</Text>
//             <Text>Wie willst du zahlen?</Text>
//             <Box display="flex" justifyContent="space-between" width="500px">
//               <Card
//                 elevate
//                 onClick={() => setSelectedProduct('quartal')}
//                 width="40%"
//               >
//                 Quartalsweise
//               </Card>
//               <Card
//                 elevate
//                 onClick={() => setSelectedProduct('jahr')}
//                 width="40%"
//               >
//                 Jährlich
//               </Card>
//             </Box>
//           </>
//         ) : (
//           <>
//             Ausgewählte Membership: {selectedProduct}
//             <Box>
//               <Grid>
//                 <GridItem width={0.8}>
//                   <Card>
//                     NAme und Adressen-Formular
//                     {isCrm && (
//                       <Text>Vorausgefüllte Formualre und Adressen</Text>
//                     )}
//                   </Card>
//                   <Card>
//                     <Button>PayPal</Button>
//                     <br />
//                     <Button>Kreditkarte</Button>
//                   </Card>
//                   <Button>Weiter</Button>
//                 </GridItem>
//                 {!isCrm && (
//                   <GridItem width={0.2}>
//                     <Card>
//                       Hast du schon einmal bei uns bestellt?
//                       <FormGroup label="Kundenummer">
//                         <Input />
//                       </FormGroup>
//                     </Card>
//                   </GridItem>
//                 )}
//               </Grid>
//             </Box>
//           </>
//         )}
//       </Section>
//     </>
//   );
// };

// const Login: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
//   return (
//     <Card width="400px" elevate>
//       <FormGroup label="E-Mail" mb={0}>
//         <Input />
//       </FormGroup>
//       <FormGroup label="Passwort" mt={1}>
//         <Input />
//       </FormGroup>
//       <Button onClick={() => onSuccess()}> Login</Button>
//     </Card>
//   );
// };

// const App = () => {
//   const [isLoggedin, setIsLoggedIn] = React.useState(false);
//   const [isCrmPerson, setIsCrmPerson] = React.useState(false);

//   return (
//     <>
//       {isLoggedin ? (
//         <Checkout isCrm={isCrmPerson} setCrm={(v) => setIsCrmPerson(v)} />
//       ) : (
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           height="100vh"
//         >
//           <Login onSuccess={() => setIsLoggedIn(true)} />
//         </Box>
//       )}

//       <AdminBox>
//         <Checkbox
//           checked={isLoggedin}
//           label="Eingeloggt?"
//           name="eingeloggt"
//           value="login"
//           onChange={() => setIsLoggedIn((l) => !l)}
//         />
//         <Checkbox
//           checked={isCrmPerson}
//           label="CRM verknüpft?"
//           name="eingeloggt"
//           value="login"
//           onChange={() => setIsCrmPerson((l) => !l)}
//         />
//       </AdminBox>
//     </>
//   );
// };

const App = () => <Checkout />;

export default App;
