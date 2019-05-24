'use strict'

const Route = use('Route')
Route.post('/users', 'UserController.store').validator('User')
Route.post('/sessions', 'SessionController.store').validator('Session')
Route.post('/password', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('/password', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.post('/files', 'FileController.store')
  // apiOnly() tira o metodo create e edit
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['projects.store'],
          ['Project'] // <== QUAL VALIDATOR?
        ]
      ]
    ))
  Route.resource('projects.tasks', 'TaskController').apiOnly()
    .validator(new Map(
      [
        [
          ['projects.tasks.store'],
          ['Task'] // <== QUAL VALIDATOR?
        ]
      ]
    ))
}).middleware(['auth'])
