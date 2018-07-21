let todos = []
let users = []


function getUsers(done) {
  if (localStorage['users']) {
    users = JSON.parse(localStorage['users'])
  }
  if (users && users.length > 0) {
    return done(users)
  }
  $.getJSON('http://jsonplaceholder.typicode.com/users', (data) => {
    localStorage['users'] = JSON.stringify(data)
    done(data)
  })
}
function getPosts(done) {
 
  $.getJSON('https://jsonplaceholder.typicode.com/posts', (data) => {

    done(data)
  })
}







function getAlbum(done) {
 
  $.getJSON('https://jsonplaceholder.typicode.com/albums', (data) => {

    done(data)
  })
}

function getTodos(done) {
  if (localStorage['todos']) {
    todos = JSON.parse(localStorage['todos'])
  }
  if (todos && todos.length > 0) {
    return done(todos)
  }
  $.getJSON('http://jsonplaceholder.typicode.com/todos', (data) => {
    localStorage['todos'] = JSON.stringify(data)
    done(data)
  })
}
function refreshPosts(posts) {
  var l=0;
  posts.forEach((post) => {
    l++;
    $('#row-posts').append(
      `
      <div class="card" style="width: 100%">
      
      <div class="card-body">
      
        <h3 class="card-title">${post.title}</h3>
        <p class="card-text">${post.body}</p>
        <button type="button" class="btn btn-primary btn-sm com">Comments</button>
        
        <div id="post${l}" class="spe"> </div>
        
      </div>
    </div>
      `
    )
  })
  setTimeout(addcomments,1);
}
function addcomments()
{ var i=0;
 $.getJSON('http://jsonplaceholder.typicode.com/comments',function(data){

   data.forEach(function(comment){
     if(comment.postId!=i)
     {i++;}

  $("#post"+i).append(`
  <h5 class="card-title">name": "${comment.name}"</h5>
         <p class="card-text"> <h6>email": "${comment.email}"</h6> ${comment.body} </p>
                                
                    
  `);
   })

 })
   $('.com').click(function(){
  var t= $($(this)).next();
  t.toggle();

   });


}


function refreshUsers(users) {
  users.forEach((user) => {
    $('#row-users').append(
      `
          <div class="col-sm-6 col-md-6 col-lg-4">
            <div class="card m-2">
              <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <h6 class="card-subtitle">${user.email}</h6>
                <p class="card-text">
                  ${user.address.street}<br>
                  ${user.address.suite}<br>
                  ${user.address.city}<br>
                  ${user.address.zipcode}
                </p>
                <a onclick="showTodosOfUser(${user.id})" href="#" class="card-link">Todos</a>
              </div>
            </div>
          </div>
      `
    )
  })

 
}







function addphotos()
{   
   var k=1;

  $.getJSON('https://jsonplaceholder.typicode.com/photos', function(data){

  data.forEach(function(pic){
  if(pic.albumId!=k)
  {
    k++;}

    

$(`#photo${k}`).append(`
    
    <a href="${pic.url}" target="_blank" class="thumbnail">
      <img src="${pic.thumbnailUrl}">
    </a>
  
`)


})

   




  })

 $('.photosdem').click(function(){
 var u= $($(this)).next();
 u.toggle();


 });


}

function refreshAlbum(album){
  
 var k=0;
album.forEach((alb)=>{
 
  k++;
  $('#row-albums').append(
`
<div class="card" style="width: 100%">
      
                        <div class="card-body">
                          <h3 class="card-title alb">${alb.title}</h3>
                          <button type="button" class="btn btn-primary btn-sm photosdem">View Photos</button>
                             <div class="albm vis row" id="photo${k}">
                               
                             
                             </div>
                         
                             
                
                                </div>
      
                      
                      </div>
`






   );
})
setTimeout(addphotos,1);
}









function showTodosOfUser(userId) {
  toggleActive('todos')
  refreshTodos(todos, userId)
}
function refreshTodos(todos, filterUserId) {
  if (filterUserId) {
    todos = todos.filter((todo) => (todo.userId === filterUserId))
  }
  todos.forEach((todo) => {
    $('#row-todos').append(
      `
    <div class="row list-group-item">
      <span class="col-3"><input type="checkbox" ${todo.completed ? 'checked' : ''}></span>
      <span class="col ${todo.completed ? 'completed-task': ''}">${todo.title}</span>
    </div>
    `
    )
  })

}
function toggleActive(newActiveTab) {
  $('.nav > li > a').removeClass('active')
  $(`#tab-${newActiveTab} > a`).addClass('active')
  $('.contents').hide()
  $(`#container-${newActiveTab}`).show()
}

$(function () { // means window.onload or document.onready in jquery

  // When page loads, by default show users
  toggleActive('users')
  getUsers((users) => refreshUsers(users))


  $('#tab-users').click(() => {
    var t= $('.active').parent().attr('id').split("-")
    if(t[1]!='users')
    {toggleActive('users')
  
    getUsers((users) => refreshUsers(users))}
  })
  $('#tab-albums').click(() => {
    var p= $('.active').parent().attr('id').split("-");
  
 if(p[1]!='albums')
    toggleActive('albums')
 
        getAlbum((album)=>refreshAlbum(album))


  })
  $('#tab-posts').click(() => {
    toggleActive('posts')

    getPosts((posts)=>refreshPosts(posts))
  })
  $('#tab-todos').click(() => {
   
    toggleActive('todos')
    getTodos((todos) => refreshTodos(todos))
  })

})
