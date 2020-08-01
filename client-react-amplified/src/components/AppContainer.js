/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import VideoGrid from './VideoGrid';
import UploadForm from './UploadForm';
import { Grid, Button } from "@material-ui/core";

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
    
      
      try
      {
        const videodata = await API.graphql(graphqlOperation(listVideos)) 
        const videos = videodata.data.listVideos.items;
        setVideos(videos);
      } catch (e) {
        const videos = e.data.listVideos.items;
        setVideos(videos);
      }
    
  }

  return (
    <div>
      
      <Button onClick= {() => signOut()}/>
      
        <VideoGrid videos={videos}/>
      
        <UploadForm/>
     
    </div>
  );
  
}



export default AppContainer;