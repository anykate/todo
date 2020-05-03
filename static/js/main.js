window.setTimeout(function() {
  $(".alert")
    .fadeTo(500, 0)
    .slideUp(500, function() {
      $(this).remove();
    });
}, 1000);

var app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        task: 'do nothing'
    }
})
