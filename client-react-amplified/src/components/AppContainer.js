/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import VideoGrid from './VideoGrid';
import UploadForm from './UploadForm';
import { Grid, Button, Container, Box } from "@material-ui/core";
import  'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './appContainerStyles.css';
async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

const AppContainer = () => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
  }, [])

  const styles= {
    marginTop: '50px'
  }
  const leftMenu = {
    
  }

  async function fetchVideos() {
      
    //GraphQL reports both fetches data anad error if any for each element
      try
      {
        // If there are no errors set whole data
        // const videodata = await API.graphql(graphqlOperation(listVideos)) 
        // const videos = videodata.data.listVideos.items;
        const videos = 
        [
          
        ]
        setVideos(videos);
      } catch (e) {
        //if error set gathered data
        const videos = e.data.listVideos.items;
        setVideos(videos);
      }
  }

  return (
    <div>
      <div className= "container">
        <Navbar className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
          <a class="navbar-brand" >AwsVideos</a>
          <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </Button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" >Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" >Sign Out</a>
            </li>
          
          </ul>
         </div>
        </Navbar>  
      </div>
    <div style ={styles}>
          <Box >     
                <Button variant="contained" color="secondary" onClick= {() => signOut()}>
                  Sign Out
                </Button>
              </Box>
              <Container display="flex">
                <Grid container 
                      justify="center"
                      alignItems="center"
                      direction="row"
                      spacing={2}
                      maxWidth="md">
                  <Grid item >
                    <VideoGrid videos={videos}/>   
                  </Grid>
                  <Grid item>
                    <Box>
                      <UploadForm/>
                    </Box> 
                  </Grid>
                </Grid>
              </Container>
          </div>
            
    </div>
  );
  
}



export default AppContainer;