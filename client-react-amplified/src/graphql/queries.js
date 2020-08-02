/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVideo = /* GraphQL */ `
  query GetVideo($guid: String!) {
    getVideo(guid: $guid) {
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
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: TableVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const queryVideosBySrcBucketStartTimeIndex = /* GraphQL */ `
  query QueryVideosBySrcBucketStartTimeIndex(
    $srcBucket: ID!
    $first: Int
    $after: String
  ) {
    queryVideosBySrcBucketStartTimeIndex(
      srcBucket: $srcBucket
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;
