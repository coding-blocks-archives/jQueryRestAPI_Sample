let todos = []
let users = []
let Posts = []
let CommentArr = []


function getUsers(done) {  
  if(localStorage['posts']){
    Posts = JSON.parse(localStorage['posts'])
    
  }


  if(localStorage['comments']){
   CommentArr = JSON.parse(localStorage['comments'])
  }

  if (localStorage['todos']) {
    todos = JSON.parse(localStorage['todos'])
  }
  if (users && users.length > 0) {
    return done(users)
  }
  $.getJSON('http://jsonplaceholder.typicode.com/users', (data) => {
    localStorage['users'] = JSON.stringify(data)
    done(data)
  })
}
    function getComment(id,done) {
      if($(`#${id}`).hasClass(`#${id}`)){ return toggleComment(id) }
    
      if(CommentArr && CommentArr > 0){
        return done(CommentArr, id)
      } 
    
      $.getJSON(`http://jsonplaceholder.typicode.com/comments`, (data) => {
        done(data,id)
      })
    }
    
    function getAlbums(done){
      $.getJSON("http://jsonplaceholder.typicode.com/albums", (data) => {
        done(data)
      } )
    }
    function getPosts(done) {
    
      if(Posts && Posts.length>0){
        return done(Posts)
    
      }
    
      $.getJSON("http://jsonplaceholder.typicode.com/posts", (data) => {
        localStorage['posts'] = JSON.stringify(data)
         done(data)
      })
    }
    
    function getPictures(id, done){
      if($(`#album-${id}`).hasClass(`#album-${id}`)){ return togglePicture(id) }
    
      $.getJSON("http://jsonplaceholder.typicode.com/photos", (data) => {
        done(id, data)
      })
    }

    function getTodos(done) {
      if (localStorage['users']) {
        users = JSON.parse(localStorage['users'])
      }
  if (todos && todos.length > 0) {
    return done(todos)
  }
  $.getJSON('http://jsonplaceholder.typicode.com/todos', (data) => {
    localStorage['todos'] = JSON.stringify(data)
    done(data)
  })
}


function refreshComments(data, id) {
  if(id) {
    data = data.filter((comment) => (comment.postId === id))
  }
  data.forEach( (comment) => {
    $(`#${id}`).append(`<div class="card m-2" style="width: 18rem;">
    <ul class="list-group list-group-flush">
    <li class="list-group-item"> <b>Name: </b> ${comment.name}</li>
    <li class="list-group-item"> <b>Email: </b>${comment.email}</li>
    <li class="list-group-item">${comment.body}</li>
    </ul>
    </div>`)
  } )
  $(`#${id}`).addClass(`#${id}`)
}

function toggleComment(id){
  $(`#${id}`).slideToggle(800);
}

function togglePicture(id){
  $(`#album-${id}`).slideToggle(800);
}


function refreshPictures (id, pictures){
  if(id) {
    pictures = pictures.filter( (picture) => id === picture.albumId )
  }
  
  pictures.forEach( (picture) => {
    $(`#album-${id}`).append(
      `
      <a href="${picture.url}"> <img src="${picture.thumbnailUrl}"> </a>
      `
    )
  })
  $(`#album-${id}`).addClass(`#album-${id}`)
}
function resfreshAlbums(albums) {
  albums.forEach((album) => {
    $("#row-albums").append(
      `<div class="card col-12 mt-2" style="width: 18rem;">
      <div class="card-body ">
      <h5 class="card-title"><b>${album.title}</b></h5>
      <button onclick="getPictures(${album.id}, refreshPictures)" class="btn btn-primary m-2">Pictures</button>                
      <div id="album-${album.id}"> </div>  
      </div>
      </div>`
    )
  } )
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



function createPost(post){
  $('#row-posts').append(`
  <div class="card col-md-10 col-sm-12 m-2">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${post.body}</p>
    <button href="#" onclick="getComment(${post.id}, refreshComments)" type="button" class="btn btn-primary comment-btn m-2">Comments</button>
    <div class="comment" id="${post.id}"> </div>
    </div>
    </div>`);
    
}

function refreshPosts(posts) {
  posts.forEach((post) => createPost(post))
}




$(function () { // means window.onload or document.onready in jquery

  // When page loads, by default show users
  toggleActive('users')
  getUsers((users) => refreshUsers(users))


  $('#tab-users').click(() => {
    toggleActive('users')
    getUsers((users) => refreshUsers(users))
  })
  $('#tab-albums').click(() => {
    toggleActive('albums')
    getAlbums((albums) => resfreshAlbums(albums))
  })
  $('#tab-posts').click(() => {
    toggleActive('posts')
    getPosts((posts) => refreshPosts(posts))
  })
  $('#tab-todos').click(() => {
    toggleActive('todos')
    getTodos((todos) => refreshTodos(todos))
  })

})