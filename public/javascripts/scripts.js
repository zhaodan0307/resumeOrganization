document.getElementsByClassName('datePicker').valueAsDate = new Date();

function confirmDelete() {
    return confirm('Are you sure you want to delete this?')
}


function back() {
    window.location.reload(true);
}

$(document).ready(function(){
    $("#filterInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable *").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});