$(document).ready(function () {
  const $tweetText = $("#tweet-text");

  $tweetText.on('input', function (event) {
    // console.log(event.key);
    console.log($(this).val());
    const maxInput = 140;
    const characterLength = $(this).val().length;
    let remain = maxInput - characterLength;
    
    $(".counter").text(remain);
    if(remain <0){
      $("output").addClass("negative");

    }else{
      $("output").removeClass("negative");

    }
    


  });

});