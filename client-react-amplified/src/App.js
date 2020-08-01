/* src/App.js */
import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from "./aws-exports";
import AppContainter from './components/AppContainer';
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
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
  }

export default withAuthenticator(App);