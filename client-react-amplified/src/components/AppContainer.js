/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import VideoCarousel from './VideoCarousel';
import UploadForm from './UploadForm';


const AppContainer = () => {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    try {
      const videoData = await API.graphql(graphqlOperation(listVideos))
      const videos = videoData.data.listVideos.items
      setVideos(videos)
    } catch (err) { console.log('error fetching videos') }
  }

  return (
    <div>
      <VideoCarousel videos={videos}/>
      <UploadForm/>
    </div>
  );
  
}



export default AppContainer;