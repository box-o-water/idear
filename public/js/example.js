// Your code that will be used by handlebars/Frontend goes in this js folder path
console.log("test")
function gen(target, cssClass, params) {
  var obj = $('#templates .upvote').clone();
  obj.addClass(cssClass);
  $(target).append(obj);
  return obj.upvote(params);
}

function callTest (data){
    $.ajax({
        url: '/vote',
        type: 'put',
        data: { id: data.id, up: data.upvoted, down: data.downvoted },     
        success:function(data) {
            if(data) {   // DO SOMETHING     
                console.log(data);
            } else { // DO SOMETHING }
                console.log("fail"); 
          }
        }, 
    });
}
$(function() {
      function gen_examples(params) {
          gen('#test', '', params);
      }
      var functions = [gen_examples];
      for (var i in functions) {
          var fun = functions[i];

          fun({id: "some id", count: 5, callback: callTest});

      }
});