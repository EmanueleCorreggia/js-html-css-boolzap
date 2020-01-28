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
    var data = new Date();
    var hours = addZero(data.getHours());
    var minutes = addZero(data.getMinutes());
    var time = hours +':'+ minutes;
    newMessage.find('.message-time').text(time);
    newMessage.addClass('sent');
    $('.col-right-messages.active').append(newMessage);
    scrollMessage();
    setTimeout(sendResponse, 1000);
    $('input.send-message').val('');
  }
}
// funzione che manda risposta
function sendResponse() {
  var messageResponse = $('.template .message').clone();
  messageResponse.find('.message-text').text('ok');
  var data = new Date();
  var hours = addZero(data.getHours());
  var minutes = addZero(data.getMinutes());
  var time = hours +':'+ minutes;
  messageResponse.find('.message-time').text(time);
  messageResponse.addClass('received');
  $('.col-right-messages.active').append(messageResponse);
  scrollMessage();
}
// funzione che scrolla
function scrollMessage() {
    var heightContainer = $('.col-right-messages.active').height();
    $('.col-right-messages.active').scrollTop(heightContainer);
}
// Funzione che aggiunge zero
function addZero(number) {
  if(number < 10) {
    number = '0' + number;
  }
  return number;
}
// intercetto il focus e trasformo l'icona del microfono in invio
$('.second_item input').focus(function(){
  $('.last_item .send i').toggleClass('fas fa-microphone fas fa-paper-plane');
}).blur(function(){
    $('.send i').toggleClass('fas fa-microphone fa fas fa-paper-plane')
});

//  al click di 'Cancella Messaggio', questo, viene rimosso dal DOM
$(document).on('click', '.delete_message', function() {
  $(this).parents('.message').remove();
});

//  cliccando sulla chevron nel messaggio, spunta il dropdown
$(document).on('click', '.fa fa-chevron-down', function() {
  $(this).siblings('.menu').toggleClass('menu_on');
});
