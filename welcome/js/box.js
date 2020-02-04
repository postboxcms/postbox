function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            // $('#data-image').remove();
            // $('.image-placeholder').remove();
            var image = document.createElement('img');
            var imagePlaceholder = input.nextElementSibling;
            imagePlaceholder.parentNode.removeChild(imagePlaceholder);
            image.setAttribute('id','data-image');
            image.setAttribute("src", e.target.result);
            image.setAttribute("width", "90%");
            image.setAttribute("style", "margin-top:5px");
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
  
function animateProgressBar() {
    console.log('animated')
}