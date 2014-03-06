$(document).ready(function(){

    $("#form_submit").on("click", function(event){
        event.preventDefault();
        $.ajax({
            url: "/",
            method: "POST",
            data: $("form#todo_list_form").serialize()
        }).done(function(data){
            $("#actual-list").html(data);
        }).fail(function(){
            alert('fail!!!');
        });
    });

    $(".href_tag").on("click", function(event){
        event.preventDefault();
        $.ajax({
            url:this.href,
            method: "GET"
        }).done(function(data){
            $(".container").html(data);
            $("#form_submit2").on("click", function(event){
                event.preventDefault();
                console.log("not yay");
                $.ajax({
                    url:"/todo_lists/" + $("#todoId").val(),
                    method: "POST",
                    data: $("form#todo-item-form").serialize()
                }).done(function(data){
                    event.preventDefault();
                    $("#actual-items").html(data);
                }).fail(function(){
                    alert('fail!!!');
                });
            });
            $("#link_button").on("click", function(event){
                event.preventDefault();
                location.replace('/?2');
            });
        });
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

