function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            $('#data-image').remove();
            var image = document.createElement('img');
            var imagePlaceholder = document.getElementById('image-placeholder');
            var imageFlag = document.getElementById('image_flag');
            imagePlaceholder.classList.add('d-none');
            imageFlag.value = "0";
            image.setAttribute('id','data-image');
            image.setAttribute("src", e.target.result);
            image.setAttribute("width", "90%");
            image.setAttribute("style", "margin-top:5px");
            image.setAttribute("onmouseover","showDeleteOverlay()");
            image.setAttribute('id','data-image');
            $(image).insertAfter(input);
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
    var imageFlag = document.getElementById('image_flag');
    image.parentNode.removeChild(image);
    imagePlaceholder.classList.remove('d-none');
    imageFlag.value = '1';
    return false;
}
  
function animateProgressBar() {
    console.log('animated')
}