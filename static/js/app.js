$(document).ready(function(){

    $("#form_submit").on("click", function(event){
        event.preventDefault();
        $.ajax({
            url: "/",
            method: "POST",
            data: $("form#todo_list_form").serialize()
        }).done(function(data){
            //alert(data);
            $("#actual-list").html(data);
        }).fail(function(){
            alert('fail!!!');
        });
    });
    $("#form_submit2").on("click", function(event){
        event.preventDefault();
        $.ajax({
            url: "/todo_lists/" + $("#todoId").val(),
            method: "POST",
            data: $("form#todo-item-form").serialize()
        }).done(function(data){
            //alert(data);
            $("#actual-items").html(data);
        }).fail(function(){
            alert('fail!!!');
        });
    });
    $("#link_button").on("click", function(event){
        event.preventDefault();
        location.replace('/');
    });

});

var getListsFromServer = function() {
    $.ajax({
        url:'/todo_lists/poll',
        method: "GET"
    }).done(function(data){
        $("#actual-list").html(data);
    });
};





