/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo(
    $guid: String
    $srcHeight: Int
    $srcWidth: Int
    $hlsUrl: String
    $mp4Urls: [String]
  ) {
    onCreateVideo(
      guid: $guid
      srcHeight: $srcHeight
      srcWidth: $srcWidth
      hlsUrl: $hlsUrl
      mp4Urls: $mp4Urls
    ) {
      guid
      srcHeight
      srcWidth
      hlsUrl
      mp4Urls
      srcMediainfo
      srcVideo
    }
  }
`;
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo(
    $guid: String
    $srcHeight: Int
    $srcWidth: Int
    $hlsUrl: String
    $mp4Urls: [String]
  ) {
    onUpdateVideo(
      guid: $guid
      srcHeight: $srcHeight
      srcWidth: $srcWidth
      hlsUrl: $hlsUrl
      mp4Urls: $mp4Urls
    ) {
      guid
      srcHeight
      srcWidth
      hlsUrl
      mp4Urls
      srcMediainfo
      srcVideo
    }
  }
`;
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo(
    $guid: String
    $srcHeight: Int
    $srcWidth: Int
    $hlsUrl: String
    $mp4Urls: [String]
  ) {
    onDeleteVideo(
      guid: $guid
      srcHeight: $srcHeight
      srcWidth: $srcWidth
      hlsUrl: $hlsUrl
      mp4Urls: $mp4Urls
    ) {
      guid
      srcHeight
      srcWidth
      hlsUrl
      mp4Urls
      srcMediainfo
      srcVideo
    }
  }
`;
