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
// funzione che invia messaggio utente
function sendMessage() {
  var textMessage = $('.second_item input.send-message').val();
    if(textMessage.length != 0) {
      var newMessage = $('.template .message').clone();
      console.log(newMessage);
      newMessage.find('.message-text').text(textMessage);
      newMessage.addClass('sent');
      $('.col-right-messages.active').append(newMessage);

  }
}
