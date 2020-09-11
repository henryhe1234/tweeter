$(document).ready(function () {
  const $tweetText = $("#tweet-text");
  //event listener on textarea, count the character user has put in
  $tweetText.on('input', function (event) {
    // console.log(event.key);
    console.log($(this).val());
    const maxInput = 140;
    const characterLength = $(this).val().length;
    let remain = maxInput - characterLength;

    $(".counter").text(remain);
    if (remain < 0) {
      $("output").addClass("negative");

    } else {
      $("output").removeClass("negative");

    }



  });

});