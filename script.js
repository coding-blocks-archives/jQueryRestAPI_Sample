
function getUsers(done) {
  $.getJSON('http://jsonplaceholder.typicode.com/users', (data) => {
    done(data)
  })
}
function getTodos(done) {
  $.getJSON('http://jsonplaceholder.typicode.com/todos', (data) => {
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
              </div>
            </div>
          </div>
      `
    )
  })
}

function refreshTodos(todos) {

}
function toggleActive(newActiveTab) {
  $('.nav > li > a').removeClass('active')
  $(`#tab-${newActiveTab} > a`).addClass('active')
  $('.contents').hide()
  $(`#container-${newActiveTab}`).show()
}

$(function () { // means window.onload or document.onready in jquery

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