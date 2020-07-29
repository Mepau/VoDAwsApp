/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createVideo } from './graphql/mutations'
import { listVideos } from './graphql/queries'
import { withAuthenticator } from '@aws-amplify/ui-react'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchVideos() {
    try {
      const videoData = await API.graphql(graphqlOperation(listVideos))
      const videos = videoData.data.listVideos.items
      setVideos(videos)
    } catch (err) { console.log('error fetching videos') }
  }

  async function addVideo() {
    try {
      if (!formState.name || !formState.description) return
      const video = { ...formState }
      setVideos([...videos, video])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createVideo, {input: video}))
    } catch (err) {
      console.log('error creating video:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify Videos</h2>
      {
        videos.map((video, index) => (
          <div key={video.id ? video.id : index} style={styles.video}>
            <p style={styles.videoName}>{video.name}</p>
            <p style={styles.videoDescription}>{video.description}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  video: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  videoName: { fontSize: 20, fontWeight: 'bold' },
  videoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);