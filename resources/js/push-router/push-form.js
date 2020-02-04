(function ($) {

    $.fn.pushForm = function (opts) {
        var form = $(this);
        if(typeof opts == 'undefined') {
                opts = {};
        }
        if (typeof opts.editor !== 'undefined') {            
            $.getScript('//cdn.ckeditor.com/ckeditor5/12.4.0/classic/ckeditor.js', function () {
                        // const ClassicEditor = require('ckeditor');
                        ClassicEditor
                            .create(document.querySelector(opts.editor))
                            .then(textEditor => {
                                // console.log( editor );
                                // editor.setData('test content')
                                fontColor: "grey",
                                editor = textEditor;
                                // this.value(editorData);
                            })
                            .catch(error => {
                                // console.error( error );
                            });
            });
            // console.log('editor initialized')

            editorElement = opts.editor;
        } else {
            editorData = '';
        }
        // console.log(editor.getData())

        $(this).submit(function (e) {
            e.preventDefault();
            var attrs = [];
            attrs['action'] = $(this).attr('action');
            attrs['method'] = $(this).attr('method');
            var formData = new FormData(this);
            var elements = this.elements;

            // console.log(elements)

            $.each(elements, function (index, elem) {
                if ((elem.name !== undefined || elem.name !== '') && (elem.value !== undefined || elem.value !== '')) {
                    if(elem.type == 'checkbox') {
                        if(elem.checked == true) {
                            elem.value = 1;
                        } else {
                            elem.value = 0;
                        }
                    }
                    
                    formData.set(elem.name, elem.value);                    

                    if(typeof opts.editor !== 'undefined') {
                        if ($(elem).hasClass(opts.editor.substring(1,opts.editor.length))) {
                            formData.set(elem.name, editor.getData());
                        }    
                    }

                }
            });
            // append files to form data
            if(typeof opts.files !== 'undefined') {
                var files = opts.files;
                files.forEach(function (field) {
                    // console.log(form.find('input[name="' + field + '"]')[0].files);
                    if (form.find('input[name="' + field + '"]')[0].files.length > 0) {
                        formData.append(field, form.find('input[name="' + field + '"]')[0].files[0]);
                        // console.log($('input[name="'+field+'"]'));
                    }
                });
            }

            attrs['data'] = formData;
            // console.log(editor.getData())            

            // console.log('push form called')

            $.getScript($.assetsUrl('js/push-router/dependencies/app-loading.min.js'), function () {
                // console.log(opts)
                $.ajax({
                    type: attrs['method'],
                    data: attrs['data'],
                    url: attrs['action'],
                    processData: false,
                    contentType: false,
                    headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
                    beforeSend: function () {
                        appLoading.start();
                        $.each(elements, function (index, elem) {
                            elem.setAttribute('disabled', 'true');
                        });
                    },
                    success: function (response) {
                        // console.log(response)
                        if(typeof opts.modal !== 'undefined') {
                            $('#'+opts.modal).modal('hide');
                            $('.modal-backdrop').remove();
                        }
                        if(typeof opts.redirect !== 'undefined') {
                            $.getScript($.assetsUrl('js/push-router/push-router.js'), function () {
                                $.openURL($.baseUrl(opts.redirect),response.message);
                                // toastr.success(response.message);         
                                return;                       
                            });    
                            return;
                        }                        
                        setTimeout(function () {
                            $('.' + opts.spanClass).remove();
                            if(typeof opts.errors !== 'undefined') {
                                $('input').removeClass(opts.errors.fieldClass);
                                $('select').removeClass(opts.errors.fieldClass);
                                $('textarea').removeClass(opts.errors.fieldClass);
                                $('.' + opts.errors.spanClass).remove();
                            }

                            $.each(elements, function (index, elem) {
                                if (elem.getAttribute('type') === 'password') {
                                    elem.value = '';
                                }
                                elem.removeAttribute('disabled');
                            });

                            toastr.success(response.message);
                            appLoading.stop();
                        }, 1000);
                    },
                    error: function (response) {
                        var errorList = response.responseJSON.errors;
                        var errorMessage = response.responseJSON.message;

                        if(typeof opts.modal !== 'undefined') {
                            $('#'+opts.modal).modal('hide');
                            $('.modal-backdrop').remove();
                        }

                        setTimeout(function () {
                            if(typeof errorList != 'undefined') {
                                $('input').removeClass(opts.errors.fieldClass);
                                $('select').removeClass(opts.errors.fieldClass);
                                $('textarea').removeClass(opts.errors.fieldClass);
                                $('.' + opts.errors.spanClass).remove();
                                $.each(errorList, function (element, message) {

                                    var errorElem = $('[name="' + element + '"]');
                                    if (!errorElem.hasClass(opts.errors.fieldClass)) {
                                        errorElem.addClass(opts.errors.fieldClass);
                                        $('[name="' + element + '"]').after('<span class="' + opts.errors.spanClass + '">' + message +
                                            '</span>');
                                        $('.' + opts.errors.spanClass).css('display', 'inline');
                                    }

                                    // console.log($('[class="'+opts.errorClass+'"]'));
                                    // console.log(element);
                                });
                            }
                            $.each(elements, function (index, elem) {
                                if (elem.getAttribute('type') === 'password') {
                                    elem.value = '';
                                }
                                elem.removeAttribute('disabled');
                            });
                            toastr.error(errorMessage);
                            appLoading.stop();
                        }, 1000);
                    }
                })
            });
            return false;
        });
    }
})(jQuery)
