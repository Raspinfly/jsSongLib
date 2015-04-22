var server = null;

// module("Test Module", {  
//   setup: function () {
//     server = sinon.fakeServer.create();
//   },
//   teardown: function () {
//     server.restore();
//     delete server;
//   }
// });

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

test("Song Library QUnit test", function() {
  equal(1, 1, 'One is one!');
}),

asyncTest("Ajax tests", function() {
  // equal(1, 1, 'One is one!');
  expect(1);  //One ajax test to run

  var xhr = $.ajax({
    type: "GET",
    url: "test-response.html"
  }).always(function(data, status) {
    var $data = $(data);
    var pageTitle = $data.filter("title").text();
    equal(pageTitle, "Ajax Test Response", "Title of test-response.html should be \'Ajax Test Response\'");
    start();
  });

}),

asyncTest("Should load 5 songs from the JSON Object", function() {
  var expected = 5;
  // stop(1);

  $.getJSON('http://localhost/jsSongLib/doc/song.json', function(data) {
    console.log('JSON data received:', data);
  }).done(function(data, status) {
    equal(data.songs.length, expected, "Five Songs were loaded from JSON");
    start();
  });
})