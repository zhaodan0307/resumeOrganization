document.getElementsByClassName('datePicker').valueAsDate = new Date();

function confirmDelete() {
    return confirm('Are you sure you want to delete this?')
}


function back() {
    window.location.reload(true);
}