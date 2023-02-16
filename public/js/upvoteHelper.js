// Your code that will be used by handlebars/Frontend goes in this js folder path

function new_gen(params){
    const collection = document.getElementsByClassName("test");
    for (var i =0; i < collection.length; i++){
        obj_id = collection[i].id;
        obj = $(collection[i]).children();
        params["id"] = obj_id;   
        $(obj.upvote(params)); 
    }  
}

function callTest (data){
    const choice_id = data.id; 

    vote_status = 'unvoted'; 
    if (data.upvoted){
        vote_status =  'upvoted';
    } else if (data.downvoted){
        vote_status = 'downvoted'; 
    }
    
    $.ajax({
        url: '/api/vote',
        type: 'put',
        data: { id: choice_id, status: vote_status },     
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
            new_gen(params); 
      }

      var functions = [gen_examples];
      for (var i in functions) {
          var fun = functions[i];
          fun({callback: callTest});
      }
});