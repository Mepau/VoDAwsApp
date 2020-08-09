/* src/App.js */
import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from "./aws-exports";
import AppContainter from './components/AppContainer';
import 'fontsource-roboto';
import {BrowserRouter , Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import UploadForm  from'./components/UploadForm';
import NavContainer from './components/NavContainer';

var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
Amplify.configure(awsExports);




const App = () => {

  return (
    <div>
    <BrowserRouter>  
     <NavContainer></NavContainer>
        <Route path="/" exact render={
          ()=>{
            return ( <div styles={styles.container}>
              <AppContainter></AppContainter>
            </div>)
          
          }
        } />
        <Route path="/uploadForm" exact component={UploadForm}>

        </Route>
   </BrowserRouter>
    </div>
   
   
  )
}

const styles = {
  container: { margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' },
  }

export default withAuthenticator(App);