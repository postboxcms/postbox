function readURL(input) {
    var prefix = '';
    if(input.name.split('_').length > 1) {
        prefix = input.name.split('_')[0]+'_';
    }
    // console.log(prefix) 
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            $('#'+prefix+'data-image').remove();
            var image = document.createElement('img');
            var imagePlaceholder = document.getElementById(prefix+'image-placeholder');
            var imageFlag = document.getElementById(prefix+'image_flag');
            imagePlaceholder.classList.add('d-none');
            imageFlag.value = "0";
            image.setAttribute('id',prefix+'data-image');
            image.setAttribute("src", e.target.result);
            image.setAttribute("class", "upload-image");
            image.setAttribute("style", "margin-top:5px");
            if(prefix != '') {
                image.setAttribute("onmouseover","showDeleteOverlay('"+input.name.split('_')[0]+"')");
            } else {
                image.setAttribute("onmouseover","showDeleteOverlay()");
            }

            image.setAttribute('id',prefix+'data-image');
            $(image).insertAfter(input);
        };
  
        reader.readAsDataURL(input.files[0]);
    }
}

function showDeleteOverlay(prefix='') {
    if(prefix !== '') {
        prefix = prefix+'_';
    }
    var dataImage = document.getElementById(prefix+'data-image');
    var imageOverlay = document.getElementById(prefix+'image-overlay');    
    if(typeof dataImage != 'undefined' && dataImage != null) {
        imageOverlay.setAttribute('style','visibility:visible')
    }
}

function hideDeleteOverlay(prefix='') {
    if(prefix !== '') {
        prefix = prefix+'_';
    }
    document.getElementById(prefix+'image-overlay').setAttribute('style','visibility:hidden');
}

function removeImage(prefix="") {
     if(prefix !== '') {
        prefix = prefix+'_';
     }
     var image = document.getElementById(prefix+'data-image');
     var imagePlaceholder = document.getElementById(prefix+'image-placeholder');
     var imageFlag = document.getElementById(prefix+'image_flag');
     image.parentNode.removeChild(image);
     imagePlaceholder.classList.remove('d-none');
     imageFlag.value = '1';
     return false;
}
  
function animateProgressBar() {
    console.log('animated')
}