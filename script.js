let todos = []
let users = []


function getUsers(done) {
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
  })
  $('#tab-posts').click(() => {
    toggleActive('posts')
  })
  $('#tab-todos').click(() => {
    toggleActive('todos')
    getTodos((todos) => refreshTodos(todos))
  })

})