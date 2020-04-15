getAndPrintComic('latest');

$('#changesubmit').click(function() {
  getAndPrintComic($('#comicchange').val());
});

$('#searchsubmit').click(function() {
  window.open("http://www.explainxkcd.com/wiki/index.php?search=" + $('#searchxkcd').val());
});

$('#comicchange').keypress(function(e){
  if(e.which==13){  
    getAndPrintComic($('#comicchange').val());
  }
});

$('#searchxkcd').keypress(function(e){
  if(e.which==13){
    window.open("http://www.explainxkcd.com/wiki/index.php?search=" + $('#searchxkcd').val());
  }
});

$('#prev').click(function() {
  if(latestid == 1) {
    return;
  } else {
    getAndPrintComic(latestid - 1);
  }
});

$('#next').click(function() {
  if(latestid == mostrecent) {
    return;
  } else {
    getAndPrintComic(latestid + 1);
  }
});

$('#first').click(function() {
  getAndPrintComic("1");
});

$('#last').click(function() {
  getAndPrintComic("latest");
});

$('#random').click(function() {
  getAndPrintComic(Math.floor((Math.random() * mostrecent) + 1));
});

function extraZeros(date) {
  if(date.length === 1) {
    return '0' + date;
  } else {
    return date;
  }
}

function printComic(comicJSON) {
  explain = "http://www.explainxkcd.com/wiki/index.php/" + comicJSON.num;
  $('body').append('<div class="comic" id="comicinfo"></div>');
  $('#comicinfo').append('<h1>' + comicJSON.safe_title + '</h1>');
  $('#comicinfo').append('<b>#' + comicJSON.num + '</b><br>');
  $('#comicinfo').append('<i>' + comicJSON.year + '-' + extraZeros(comicJSON.month) + '-' + extraZeros(comicJSON.day) + '</i><br>');
  $('#comicinfo').append('<a href="' + explain + '" target="_blank">explain xkcd</a><br>');
  $('#comicinfo').append('<a href="http://xkcd.com/' + comicJSON.num + '/" target="_blank">http://xkcd.com/' + comicJSON.num + '/</a><br><br>');
  if(comicJSON.num === 826 || comicJSON.num === 880 || comicJSON.num === 1110 || comicJSON.num === 1350 || comicJSON.num === 1416) {
    $('body').append('<p class="comic">This comic is interactive, so is better viewed on the xkcd site. <a href="http://xkcd.com/' + comicJSON.num + '/" target="_blank">Here\'s a link to the comic.</p>');
  } else {
  $('body').append('<img class="comic" src="' + comicJSON.img + '" title="' + htmlEncode(comicJSON.alt) + '">');
}
}

// Thanks to CMS on StackOverflow for HTML encode http://stackoverflow.com/questions/1219860/html-encoding-in-javascript-jquery

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function getAndPrintComic(comicid) {
  clearComic();
  if(comicid === 'latest') {
    var comicurl = 'http://xkcd.com/info.0.json';
  } else {
    var comicurl = 'http://xkcd.com/' + comicid + '/info.0.json';
  }
  $.getJSON( comicurl, null, function(data) {
    printComic(data);
    window.latestid = data.num;
    if(comicid === 'latest') {
      window.mostrecent = data.num;
    };
  }).error(function() {
    $('body').append('<h2 class="comic error">Error</h2>');
    $('body').append('<p class="comic error">There was an error trying to get that comic. Either the id you entered is not a valid id, or that comic does not exist yet.</p>')
    $('body').append('<button id="goback" class="comic error">Go Back</button>');
    $('#goback').click(function() {
      getAndPrintComic(latestid);
    });
  })
}

function clearComic() {
  $('.comic').remove()
}
