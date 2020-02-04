/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

// require('./bootstrap');
// require('./toastr.min');
// require('./box');


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

$(document).ready(function() {
    $(this).on('click', '#sidebarToggle', function() {
      console.log(getCookie('toggle_switch'));
        if(getCookie('toggle_switch') == 1) {
            document.cookie = 'toggle_switch=0';
        } else {
            document.cookie = 'toggle_switch=1';
        }
    });
    $('.dropdown-toggle').dropdown();
});