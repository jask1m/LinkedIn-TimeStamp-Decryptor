const extractId = (url) => {
  // Regular expression pattern to match the post ID
  // Looking for exactly 19 digits after "activity-"
  const pattern = /activity-(\d{19})/;
  
  // Search for the pattern in the URL
  const match = url.match(pattern);
  
  // If a match is found, return the post ID
  if (match && match[1]) {
      const postId = match[1];
      // Additional check to ensure it's a valid integer
      if (!isNaN(postId) && postId.length === 19) {
          return postId;
      }
  }
  
  // Return null if no valid post ID is found
  return null;
}

const toUnixTimeStamp = (id) => {
  const bigIntId = BigInt(id).toString(2);
  const relevant_size = bigIntId.slice(0, 41);
  const timestamp = parseInt(relevant_size, 2)
  return timestamp;
}

const getTimeStamp = (timestamp) => {
  // create a js Date object with the decoded timestamp
  const dateObject = new Date(timestamp);
  // convert the instance into a presentable format
  const readableFormat = dateObject.toUTCString() + " (UTC)";
  return readableFormat
}

module.exports = { extractId, toUnixTimeStamp, getTimeStamp };