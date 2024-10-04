function changeColor(element) {
    // Remove the clicked class from all buttons
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('btn-clicked');
    });
    // Add the clicked class to the clicked button
    element.classList.add('btn-clicked');
}