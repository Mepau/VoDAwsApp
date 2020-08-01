/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import VideoCarousel from './VideoCarousel';
import UploadForm from './UploadForm';

async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}


const AppContainer = () => {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    try {
      const videoData = await API.graphql(graphqlOperation(listVideos))
      console.log(videoData);
      const videos = videoData.data.listVideos.items
      setVideos(videos)
    } catch (err) { console.log(err) }
  }

  return (
    <div>
      <button onClick= {() => signOut()}/>
      <VideoCarousel videos={videos}/>
      <UploadForm/>
    </div>
  );
  
}



export default AppContainer;