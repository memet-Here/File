<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-database.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

  // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBNl84q0vlDuEt9lVXFnCULZp74SF-lkqc",
    authDomain: "chat-1a3a1.firebaseapp.com",
    databaseURL: "https://chat-1a3a1.firebaseio.com",
    projectId: "chat-1a3a1",
    storageBucket: "chat-1a3a1.appspot.com",
    messagingSenderId: "403607097819",
    appId: "1:403607097819:web:9fc95d53c1d3fdc62597fe",
    measurementId: "G-KWJ8JJQ72W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  function sendMessage() {
    var message = document.getElementById("message").value;
    firebase.database().ref("messages").push().set({
      "message": message,
      "sender": myName
    });
    return false;
  }

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

var myName = "";

$(window).load(function() {
  myName = prompt("Enter your name");
  $messages.mCustomScrollbar();

  firebase.database().ref("messages").on("child_added", function (snapshot) {
    if (snapshot.val().sender == myName) {
      $('<div class="message message-personal"></figure><div id="message-' + snapshot.key + '">' + 'root@' + snapshot.val().sender + '<div>' + ' > ' + snapshot.val().message + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
      $('.message-input').val(null);
    } else {
      $('<div class="message new"></figure><div id="message-' + snapshot.key + '">' + 'root@' + snapshot.val().sender + '<div>' + ' > ' + snapshot.val().message + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
    }
    
    setDate();
    updateScrollbar();
  });

});


function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}


function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }

  sendMessage();
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});
