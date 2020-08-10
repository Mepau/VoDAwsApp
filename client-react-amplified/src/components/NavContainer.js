import  React from 'react';
import { Grid, Button, Container, Box } from "@material-ui/core";
import  'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {Link, BrowserRoute} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


const NavContainer = (props)=>{
  const {history} = props;
  const signOut = async () => {
      try {
       
        console.log("sign out!");
          await Auth.signOut();
                 
        
      } catch (error) {
          console.log('error signing out: ', error);
      }
   };

  return(
    <div className= "container">
    <Navbar className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <Link to="/" className="navbar-brand" >AwsVideos</Link>
      <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </Button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">       
        <li className="nav-item" >
          <Button  className="nav-link"  onClick= {() => signOut()} >Sign Out</Button>            
        </li>
      
      </ul>
    </div>
    </Navbar>  
  </div>
  )
}

export default withRouter(NavContainer);


