(function ($) {
    $.pushRoute = function (opts) {
        // console.log('route pushed')
        var elem = opts.element;

        $(document).on('click', elem, function () {
            if ($(this).attr("href") == document.URL) {
                return false;
            }
            var isInvalid = false;
            var attr = $(this).attr("href");
            
            if(typeof attr !== typeof undefined && attr !== false && !$(this).hasClass('no-push')) {
                isInvalid = $(this).attr("href").lastIndexOf('#') >= 0 || $(this).attr("href").indexOf('javascript') >= 0 || $(this).attr("href") == "";
            } else {
                isInvalid = true;
            }

            if (isInvalid == false) {
                $.openURL($(this).attr("href"));
                return false; //intercept the link            
            }

        });

        window.addEventListener('popstate', function (e) {
            if (e.state) {
                $.openURL(e.state.href);
            }
        });

    }

    $.openURL = function (href, message) {
        // console.log('url pushed')
        var link = href;  //$(this).attr('href');                                    
        var response = '';
        var element = '#box';
        $.getScript($.assetsUrl('js/push-router/dependencies/app-loading.min.js'), function() {        
            $.ajax({
                url: link,
                type: 'GET',
                cache: false,
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                beforeSend: function () {                
                    appLoading.start();                
                    response = document.createElement('html');
                },
                success: function (result) {
                    response.innerHTML = result;
                    var pageTitle = response.querySelector('title');
                    var newData = response.querySelector(element);
                    var scripts = response.querySelectorAll('script');
                    var styles = response.querySelectorAll('link');
                    var docStyles = document.querySelectorAll('link');

                    setTimeout(function () {
                        $('title').replaceWith(pageTitle);
                        $(element).replaceWith(newData);

                        // execute inline javascripts on DOM again after loading, load additional styles and scripts
                        for (i = 0; i <= scripts.length; i++) {
                            var scriptIsLoaded = (typeof scripts[i] !== 'undefined') ? document.querySelectorAll("script[src='" + scripts[i].src.toString() + "']").length > 0 : false;
                            if (!scriptIsLoaded) {
                                if($(scripts[i]).attr('data-type') !== 'push-router') {
                                    $('body').append(scripts[i]);
                                }
                            }

                            if (typeof scripts[i] !== 'undefined') {
                                if (scripts[i].src !== "") {
                                    if (!scriptIsLoaded) {
                                        if($(scripts[i]).attr('data-type') !== 'push-router') {
                                            $('body').append(scripts[i]);
                                        }
                                    }
                                } else if (typeof scripts[i].outerText !== 'undefined' && scripts[i].outerText.trim() !== "") {
                                    try {
                                        // console.log('remove scripts called')
                                        $(scripts[i]).remove();
                                    } catch (err) {
                                        console.log(err)
                                    }
                                } else if (typeof scripts[i].innerText !== 'undefined' && scripts[i].innerText.trim() !== "") {
                                    try {
                                        // console.log('appendchild called')
                                        // console.log('remove scripts')
                                        $(scripts[i]).remove();
                                    } catch (err) {
                                        console.log(err)
                                    }
                                }
                            }

                            if (typeof docStyles[i] == 'undefined' || typeof docStyles[i].outerHTML == 'undefined') {
                                $('head').append(styles[i]);
                            }
                        }
                        if(message !== undefined) {
                            console.log(message)
                            toastr.success(message);
                        }
                        appLoading.stop();
                    }, 1000);
                },
                error: function (e) {
                    console.log('Something went wrong. Please try again');
                    appLoading.stop();
                }
            });
        });
        window.history.pushState({ href: href }, '', href);
    }

}(jQuery));

