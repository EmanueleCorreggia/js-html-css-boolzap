$(document).ready(function () {
  $('.icon-send').click(function () {
    sendMessage();
  });
// per il tasto invio
  $('.send-message').keypress(function(event) {
    if(event.which == 13) {
      sendMessage();
    }
  });
// quando scrivo nell'input della ricerca chat
  $('.contact-search input').keyup(function () {
// mi salvo quello che scrivo in una variabile tutto in minuscolo
    var text = $('.contact-search input').val().toLowerCase();
// nascondo le chat
    $('.contact-element').each(function () {
      var contactName = $(this).find('.contact-name').text().toLowerCase();
      if(contactName.includes(text) == true) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // mostra e nasconde i dropdown
$(document).on('click', '.message-options', function() {
  $(this).parent().siblings('.message-link').toggleClass('active');
  $(this).parents('.message').siblings('.message').find('.message-link').removeClass('active');
});

// quando clicco su elimina messaggio
$(document).on('click', '.message-delete', function() {
  $(this).parents('.message').remove();
});

$(document).on('click', '.contact-element', function() {
  var data = $(this).attr('data-contact');
  var selector = '.col-right-messages[data-contact="' + data + '"]';

  $('.col-right-messages').removeClass('active');
  $(selector).addClass('active');
  $('.contact-element').removeClass('active');
  $(this).addClass('active');
  // prendo l'immagine, il nome e il messaggio ricevuti dalla chat a sinistra
  var name = $(this).find('.contact-name').text();
  var time = $(this).find('.contact-time').text();
  var img = $(this).find('.avatar img').attr('src');
  // assegno l'immagine, il nome e il rispettivo ultimo accesso alle info in alto a destra
  $('.col-right .header .contact-active .contact-name').text(name);
  $('.col-right .header .contact-active .contact-time').text(time);
  $('.col-right .header .avatar img').attr('src', img);
});
  // intercetto il focus e trasformo l'icona del microfono in invio
  $('.send-message').focus(function(){
  $('.icon-send i').removeClass('fa fa-microphone').addClass('fas fa-paper-plane');
}).blur(function(){
  $('.icon-send i').removeClass('fas fa-paper-plane').addClass('fa fa-microphone');
  });
});

// ------------- FUNZIONI -------------//

// funzione che invia messaggio utente
function sendMessage() {
  var textMessage = $('input.send-message').val();
//se la lunghezza del mess e' diversa da 0 creiamo nuovo messaggio usando il template nascosto
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
   // altezza elemento conversazione attiva
  var heightContainer = $('.col-right-messages.active').height();
  console.log(heightContainer);
  // spostiamo scroll container di tutte le conversazioni
  $('.messages-wrapper').scrollTop(heightContainer);
}

// Funzione che aggiunge zero
function addZero(number) {
  if(number < 10) {
    number = '0' + number;
  }
  return number;
}
