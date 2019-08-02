$(document).ready(()=>{
    $('.delete-todos').on('click', (e)=>{
    $target= $(e.target);
const id=$target.attr('data-id');
$.ajax({
    type:'DELETE',
    url:'/todo/delete/' +id,
    success: (response)=>{
        alert("The todo is deleted");
        window.location.href='/';
    },
    error:(error)=>{
console.log(error);
 }

}) ; 
});
});