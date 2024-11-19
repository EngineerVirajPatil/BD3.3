const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let watchList = [
  {
    videoId: 1,
    title: 'Javascript tutorial',
    watched: false,
    url: 'https://youtube.com/shortUrl1',
  },
  {
    videoId: 2,
    title: 'Node.js tutorial',
    watched: true,
    url: 'https://youtube.com/shortUrl2',
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://youtube.com/shortUrl3',
  },
];

function updateWatchedStatusById(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].watched = watched;
    }
  }
  return watchList;
}

function updateWatchedStatusForAll(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
  }
  return watchList;
}

function deleteVideoById(videoObj, videoId) {
  return videoObj.videoId != videoId;
}

function isWatched(videoObj) {
  return !videoObj.watched;
}

// /watchlist/update?videoId=1&watched=true
app.get('/watchlist/update', (req, res) => {
  let videoId = parseFloat(req.query.videoId);
  let watched = req.query.watched === 'true';
  let result = updateWatchedStatusById(watchList, videoId, watched);
  res.json(result);
});

// /watchlist/update-all?watched=true
app.get('/watchlist/update-all', (req, res) => {
  let watched = req.query.watched === 'true';
  let result = updateWatchedStatusForAll(watchList, watched);
  res.json(result);
});

//  /watchlist/delete?videoId=2
app.get('/watchlist/delete', (req, res) => {
  let videoId = parseFloat(req.query.videoId);
  let result = watchList.filter((videoObj) =>
    deleteVideoById(videoObj, videoId)
  );
  res.json(result);
});

// /watchlist/delete-watched
app.get('/watchlist/delete-watched', (req, res) => {
  console.log(watchList);
  let result = watchList.filter((videoObj) => isWatched(videoObj));
  return res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
