// Your code that will be used by handlebars/Frontend goes in this js folder path

//const { findAll } = require("../../models/User");

function new_gen(params){
    const collection = document.getElementsByClassName("test");
    for (var i =0; i < collection.length; i++){
        params['upvoted'] = false; 
        params['downvoted'] = false; 
        obj_id = collection[i].id;
        //console.log(collection[i]); 
        obj = $(collection[i]).children();
        child_obj = $(obj).children();
        //console.log(child_obj); 

        for( let i = 0; i < child_obj.length; i++){
            //console.log(child_obj[i]); 
            //console.log(params); 
            if(child_obj[i].id ==='on'){
                arrow = child_obj[i].className+'d';
                console.log(arrow); 
                params[arrow] = true;  
            }   
        } 
        //console.log(params); 
        params["id"] = obj_id;   
        console.log(params)
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