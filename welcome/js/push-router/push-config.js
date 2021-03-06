(function ($) {
    $.assetsUrl = function(url) {
        if(document.getElementsByTagName('base').length > 0) {
            var baseHref = document.getElementsByTagName('base')[0].href;
            var path = "";
            if(url.substr(0,1) !== '/' && baseHref.substr(-1) !== '/') {
                path = baseHref + '/assets/' + url;
            } else {
                path = baseHref + 'assets/' + url;
            }    
        } else {
            var baseHref = window.location.href;
            var path = "";
            if(url.substr(0,1) !== '/' && baseHref.substr(-1) !== '/') {
                path = baseHref + '/' + url;
            } else {
                path = baseHref + url;
            }                
        }
        return path;
    }
    $.baseUrl = function(url) {
        var baseHref = document.getElementsByTagName('base')[0].href;
        var path = "";
        if( url.substr(0,1) !== '/' && baseHref.substr(-1) !== '/') {
            console.log(url.substr(0,1))
            path = baseHref + '/' + url;
        } else {
            path = baseHref + url;
        }
        return path;
    }
    
    $.pushScripts = function(scripts) {
        return $.when(
            $.each(scripts, function(idx) {
                return $.getScript(scripts[idx]);
            }),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        )
    }
}(jQuery))