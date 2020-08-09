/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import VideoGrid from './VideoGrid';
import UploadForm from './forms/UploadForm';
import { Grid, Button, Container, Box } from "@material-ui/core";

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

  async function fetchVideos() {
      
    //GraphQL reports both fetches data anad error if any for each element
      try
      {
        //If there are no errors set whole data
        const videodata = await API.graphql(graphqlOperation(listVideos)) 
        const videos = videodata.data.listVideos.items;
        setVideos(videos);
      } catch (e) {

        console.log(e);
        //if error set gathered data
        const videos = e.data.listVideos.items;
        setVideos(videos);
      }
  }

  return (
    <div>
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
  );
  
}



export default AppContainer;