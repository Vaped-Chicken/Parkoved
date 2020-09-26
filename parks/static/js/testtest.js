window.addEventListener('load', event => {
  // $('#authModal').modal('show')
  console.log(event)
  $('#authModal').modal('toggle')
})

$('#authModal').on('hide.bs.modal',
    function (event ){
      $('#tinderModal').modal('toggle')
    }
)
document.getElementById('show_modal').addEventListener('click', event => {
  $('#tinderModal').modal('toggle')
})
// $(document).ready(function() {
// $("#myModal").modal('show');
// });
