$(document).ready(function() {

    $(document).on('click', 'a', function () {
      openURL($(this).attr("href"));
      return false; //intercept the link
    });  
 
    window.addEventListener('popstate', function(e){
       if(e.state)
         openURL(e.state.href);
    }); 
 
 });

 function openURL(href){

    var link = href;  //$(this).attr('href');                                    
    $.ajax({                                                             
        url: link,
        type: 'GET',
        cache: false,
        headers:{'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        beforeSend: function() {
            appLoading.start();
        },
        success: function (result) {
            var response = document.createElement('div', {"id":"wrapper"});
            response.innerHTML = result;
            console.log(response.querySelector('div#wrapper'));
            var elem = response.querySelector('div#wrapper');
            $('div#wrapper').replaceWith(elem);
            appLoading.stop();
            // $('html').replaceWith(res);
            // $.validator.unobtrusive.parse($("form#ValidateForm"));
        },
        error: function(e) {
            console.log(e);
        }
    });
    window.history.pushState({href: href}, '', href);
}