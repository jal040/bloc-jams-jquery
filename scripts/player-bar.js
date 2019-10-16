{
  $('button#play-pause').on('click', function() {
    helper.playPauseAndUpdate();
    $(this).attr('playState', player.playState);
  });

  // Function for playing next song
  $('button#next').on('click', function() {
    if(player.playState !== 'playing'){
      return;
    }

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const nextSongIndex = currentSongIndex + 1;
    if(nextSongIndex >= album.songs.length){
      return;
    }
    const nextSong = album.songs[nextSongIndex];
    helper.playPauseAndUpdate(nextSong);
  });

  // Function for playing previous song
  $('button#previous').on('click', function() {
    if(player.playState !== 'playing'){
      return;
    }

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const prevSongIndex = currentSongIndex - 1;
    if(prevSongIndex < 0){
      return;
    }
    const prevSong = album.songs[prevSongIndex];
    console.log("Previous song json: " + JSON.stringify(prevSong))
    helper.playPauseAndUpdate(prevSong);
  });

  $('#time-control input').on('input', function(event) {
    player.skipTo(event.target.value);
  });

  // Update current time of song
  setInterval( () => {
    if (player.playState !== 'playing') { return; }
    const currentTime = player.getTime();
    const duration = player.getDuration();
    const percent = (currentTime / duration) * 100;
    $('#time-control .current-time').text(player.prettyTime(currentTime));
    $('#time-control input').val(percent);
  }, 1000);

  // Update volume
  $('#volume-control input').on('input', function(event){
    player.setVolume(event.target.value);
  })
}
