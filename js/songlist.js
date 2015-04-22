// JS File for song library project

$(document).ready(function() {
  songs.init();
});


var songs = {
  songList : null,

  init : function() {
    //Initial View
    $("#addSongDiv").hide();

    //Event Handlers - If large move to separate event handler file
    $("#addSongLink").on("click", function(){
      $("#addSongDiv").show();
      $("#songList").hide();
    });

    $("#cancelBtn").on("click", function(){
      $("#songList").show();
      $("#addSongDiv").hide();
    });

    $("#saveBtn").on("click", function(){
      $("#songList").show();
      $("#addSongDiv").hide();
      songs.addSong();
    });

    songs.getSongList();
  },

  getSongList : function() {
    $.getJSON('http://localhost/jsSongLib/doc/song.json', function(data) {
      console.log('JSON data received:', data);
      songs.songList = data;
    }).done(function(data, status) {
      songList = data.songs;
      songs.createSongListView(songList);
    });
  },

  createSongListView : function(data) {
    //Clear previous data
    $("#songListTable tr:gt(0)").each(function() {
      $(this).remove();
    });
    //Add song list
    _.each(data, function(song, index){
      $("#songListTable tr:last").after("<tr><td>" + song.id + "</td><td>" + song.title + "</td><td>" + song.artist + "</td><td>" + 
        song.release_date + "</td><td>" + song.price + "</td><td><a href=\"#\" onclick=\"songs.deleteSong("+index+")\">Delete</a></td></tr>");
    });
  },

  addSong : function() {
    var song = {};
    song.id = this.songList.songs.length+1;
    song.title = $("#songName").val();
    song.artist = $("#songArtist").val();
    song.release_date = $("#rdate").val();
    song.price = $("#price").val();
    this.songList.songs.push(song);
    //Save song to server
    songs.saveSong(this.songList.songs);
    songs.createSongListView(this.songList.songs);
  },

  deleteSong : function(index) {
    this.songList.songs.splice(index, 1);
    songs.createSongListView(this.songList.songs);
  },

  saveSong : function(data) {
    if(data) {
      $.ajax({
        url: "localhost",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        complete: songs.saveSongReturn(data)
      })
    }
  },

  saveSongReturn : function(data) {
    alert("Return Data : " + data);
  }

}