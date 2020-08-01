/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import VideoGrid from './VideoGrid';
import UploadForm from './UploadForm';

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
    
      
      const videoData = await API.graphql(graphqlOperation(listVideos))
                              .catch(err => {if(err.data) setVideos(err.data.listVideos.items);})
      const videos = (videoData)?videoData.data.listVideos.items:[];
      if(videos)setVideos(videos);
    
  }

  return (
    <div>
      <button onClick= {() => signOut()}/>
      <VideoGrid videos={videos}/>
      <UploadForm/>
    </div>
  );
  
}



export default AppContainer;