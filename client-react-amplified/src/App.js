/* src/App.js */
import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import awsExports from "./aws-exports";
import AppContainter from './components/AppContainer';
Amplify.configure(awsExports);


const App = () => {

  return (
    <div style={styles.container}>
      <AppContainter/>
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  video: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  videoName: { fontSize: 20, fontWeight: 'bold' },
  videoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);