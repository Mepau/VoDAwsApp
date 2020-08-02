/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo(
    $guid: String
    $hlsUrl: String
    $mp4Urls: [String]
    $srcVideo: String
    $thumbNailsUrls: [String]
  ) {
    onCreateVideo(
      guid: $guid
      hlsUrl: $hlsUrl
      mp4Urls: $mp4Urls
      srcVideo: $srcVideo
      thumbNailsUrls: $thumbNailsUrls
    ) {
      guid
      hlsUrl
      mp4Urls
      srcVideo
      thumbNailsUrls
      frameCapture
      dashUrl
      workflowStatus
      srcHeight
      srcWidth
    }
  }
`;
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo(
    $guid: String
    $hlsUrl: String
    $mp4Urls: [String]
    $srcVideo: String
    $thumbNailsUrls: [String]
  ) {
    onUpdateVideo(
      guid: $guid
      hlsUrl: $hlsUrl
      mp4Urls: $mp4Urls
      srcVideo: $srcVideo
      thumbNailsUrls: $thumbNailsUrls
    ) {
      guid
      hlsUrl
      mp4Urls
      srcVideo
      thumbNailsUrls
      frameCapture
      dashUrl
      workflowStatus
      srcHeight
      srcWidth
    }
  }
`;
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo(
    $guid: String
    $hlsUrl: String
    $mp4Urls: [String]
    $srcVideo: String
    $thumbNailsUrls: [String]
  ) {
    onDeleteVideo(
      guid: $guid
      hlsUrl: $hlsUrl
      mp4Urls: $mp4Urls
      srcVideo: $srcVideo
      thumbNailsUrls: $thumbNailsUrls
    ) {
      guid
      hlsUrl
      mp4Urls
      srcVideo
      thumbNailsUrls
      frameCapture
      dashUrl
      workflowStatus
      srcHeight
      srcWidth
    }
  }
`;
