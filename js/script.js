$(document).ready(function () {
  $('.last_item').click(function () {
    sendMessage();
  });

  $('.send-message').keypress(function(event) {
    if(event.which == 13) {
      sendMessage();
    }
  });

  $('.search_chat input').keyup(function () {
    var text = $('.search_chat input').val().toLowerCase();

    $('.chat').each(function () {
      var contactName = $(this).find('.nome').text().toLowerCase();
      if(contactName.includes(text) == true) {
        // console.log('incluso');
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
