/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
  $('#error').hide();


  // creating single tweet HTML Element using jQuery
  const createTweetElement = (obj) => {
    const $article = $('<article>');
    const $header = $('<header>')
    const $span1 = $('<span>').addClass('userinfo');
    const $img = $('<img/>').attr('src', obj["user"]["avatars"]).addClass('image');
    const $span2 = $('<span>').text(obj["user"]["handle"]);
    $span1.text(obj["user"]["name"]);
    $img.prependTo($span1);
    $header.append($span1, $span2);

    const $div = $('<div>').addClass('tweet-text-container');
    const $span3 = $('<span>').text(obj["content"]["text"]);
    $div.append($span3);

    const $footer = $('<footer>');
    const $span4 = $('<span>').addClass('date').text(moment(obj["created_at"]).fromNow());
    const $span5 = $('<span>').addClass('subscribe');
    const $i1 = $('<i>').addClass('fas fa-flag');
    const $i2 = $('<i>').addClass('fas fa-retweet');
    const $i3 = $('<i>').addClass('fas fa-heart');

    $span5.append($i1, $i2, $i3);
    $footer.append($span4, $span5);


    $article.append($header, $div, $footer);
    return $article;
  };
  //render all the tweets in the data base
  const renderTweets = (tweets) => {
    $tweets_container = $('#tweets-container');
    $tweets_container.empty();

    for (const tweet of tweets) {
      $tweets_container.prepend(createTweetElement(tweet));
    }

  };
  // AjaxGet request to /tweets to obtain all the tweet in json format
  const loadTweets = () => {
    $.get('/tweets', null)
      .then((dataArray) => {
        renderTweets(dataArray);
      })
  }

  const $formTweeting = $('.tweeting');
  //event listener for submitting a tweet
  $formTweeting.on('submit', function (event) {
    event.preventDefault();
    $('#error').slideUp();


    const serializedData = $(this).serialize();
    const $counter = $('.counter');
    const $error = $('#error');

    if (Number($counter.val()) === 140) {
      $error.text('You typed nothing');
      const $i1 = $('<i>').addClass('fas fa-flag');
      const $i2 = $('<i>').addClass('fas fa-flag');

      $i1.prependTo($error);
      $i2.appendTo($error);
      $('#error').slideDown();
    } else if (Number($counter.val()) < 0) {

      $error.text('You type more than 140 characters');
      const $i1 = $('<i>').addClass('fas fa-flag');
      const $i2 = $('<i>').addClass('fas fa-flag');

      $i1.prependTo($error);
      $i2.appendTo($error);
      $('#error').slideDown();

    } else {
      //Ajax post request to submit tweets as well as getting tweets from database
      $.post('/tweets', serializedData)
        .then((response) => {
          $(this).children('div').children('output').val(140);
          $("output").removeClass("negative");
          $(this).children('textarea').val("");
          loadTweets();
        });
    }



  });


  //load tweet in the database at the begining
  loadTweets();
  // $('#error').hide();


});
