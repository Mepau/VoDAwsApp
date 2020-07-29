/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import { Container, Carousel } from 'react-bootstrap';

const AppContainer = () => {

  const [videos, setVideos] = useState([])
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchVideos()
  }, [])

  

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  async function fetchVideos() {
    try {
      const videoData = await API.graphql(graphqlOperation(listVideos))
      const videos = videoData.data.listVideos.items
      setVideos(videos)
    } catch (err) { console.log('error fetching videos') }
  }


  return (
    <div >
      <Container fluid>
        
      <h2>Amplify Videos</h2>
      {
        videos.map((video, index) => (
          <div key={video.guid ? video.id : index}>
            {JSON.stringify(video)}
          </div>
        ))
      }
      </Container>
    </div>



  )
}



export default AppContainer;