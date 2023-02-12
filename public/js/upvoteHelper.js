// Your code that will be used by handlebars/Frontend goes in this js folder path

function gen(target, cssClass, params) {
  var obj = $('#templates .upvote').clone();
  obj.addClass(cssClass);
  console.log(obj); 
  $(target).append(obj);
  return obj.upvote(params);
  //console.log(obj);
  //return obj.upvote(params);
}

function new_gen(params){
    const collection = document.getElementsByClassName("test");
    console.log(collection); 
    for (var i =0; i < collection.length; i++){
        obj_id = collection[i].id;

        obj = $(collection[i]).children();
        params["id"] = obj_id;  
        console.log(obj_id.split('_')[1]); 
        $(obj.upvote(params)); 
    }  
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
            //gen('#test1', '', params);
            // gen('#test2', '', params);
            // gen('#test4', '', params);
            // gen('#test5', '', params);
            // gen('#test3', '', params);
            new_gen(params); 
      }

      var functions = [gen_examples];
      for (var i in functions) {
          var fun = functions[i];

          fun({callback: callTest});

      }
});