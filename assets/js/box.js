function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            $('#data-image').remove();
            // $('.image-placeholder').remove();
            var image = document.createElement('img');
            var imagePlaceholder = document.getElementById('image-placeholder');
            // imagePlaceholder.parentNode.removeChild(imagePlaceholder);
            imagePlaceholder.setAttribute('style','display:none');            
            image.setAttribute('id','data-image');
            image.setAttribute("src", e.target.result);
            image.setAttribute("width", "90%");
            image.setAttribute("style", "margin-top:5px");
            image.setAttribute("onmouseover","showDeleteOverlay()");
            image.setAttribute('id','data-image');

            $(image).insertAfter(input);
            // input.referenceNode.insertAfter()
            // $('#blah')
            //     .attr('src', e.target.result)
            //     .width(150)
            //     .height(200);
        };
  
        reader.readAsDataURL(input.files[0]);
    }
}

function showDeleteOverlay() {
    var imageOverlay = document.getElementById('image-overlay');
    imageOverlay.setAttribute('style','visibility:visible')
}

function hideDeleteOverlay() {
    document.getElementById('image-overlay').setAttribute('style','visibility:hidden');
}

function removeImage() {
     var image = document.getElementById('data-image');
     var imagePlaceholder = document.getElementById('image-placeholder');
     image.parentNode.removeChild(image);
     imagePlaceholder.setAttribute('style','');
     return false;
}
  
function animateProgressBar() {
    console.log('animated')
}