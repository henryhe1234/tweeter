/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
  $('#error').hide();

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

  const renderTweets = (tweets) => {
    $tweets_container = $('#tweets-container');
    $tweets_container.empty();

    for (const tweet of tweets) {
      $tweets_container.prepend(createTweetElement(tweet));
    }

  };
  const loadTweets = () => {
    $.get('/tweets', null)
      .then((dataArray) => {
        renderTweets(dataArray);
      })
  }

  const $formTweeting = $('.tweeting');

  $formTweeting.on('submit', function (event) {
    event.preventDefault();
    $('#error').slideUp();


    const serializedData = $(this).serialize();
    const $counter = $('.counter');
    if (Number($counter.val()) === 140) {
      $('#error').slideDown();
      $('#error').text('You type nothing');
      // return alert('you are not inputing anything!');
    } else if (Number($counter.val()) < 0) {
      $('#error').slideDown();
      $('#error').text('Too much');
      // $('#error').slideDown();

      // return alert('you are inputing more than 140 character');
    }
      // $('#error').hide();
      $.post('/tweets', serializedData)
        .then((response) => {
          $(this).children('div').children('output').val(140);
          $("output").removeClass("negative");
          $(this).children('textarea').val("");
          loadTweets();
        });
    


  });



  loadTweets();
  // $('#error').hide();


});
