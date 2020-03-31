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

    // $.pushConfig = function (opts) {
    //         var dependencies = opts.dependencies;

    //         require.config({
    //             waitSeconds: 10,
    //             paths: dependencies
    //         });
    //         // console.log(opts)

    //         require( Object.keys(dependencies), opts.code);

    //         require.onError = function(err){
    //           console.log(err)
    //         };

    // },
    $.pushScripts = function(scripts) {
        loadScript = $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
        $.each(scripts, function(idx) {
            loadScript = $.getScript(scripts[idx]);
        });
        return loadScript;
    }
}(jQuery))