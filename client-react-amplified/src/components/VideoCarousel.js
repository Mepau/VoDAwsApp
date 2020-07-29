/* src/App.js */
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const VideoCarousel = (props) => {

    console.log(props);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {
        props.videos.map((video, index) => (
          <Carousel.Item>
            <ReactPlayer 
              url={video.hlsUrl}
              playing = {true}
              controls = {true}  
                         />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        ))
      }
    </Carousel>
  );
  
}

export default VideoCarousel;