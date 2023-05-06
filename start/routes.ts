/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import {ResponseProviders} from './../providers/ResponseProviders'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.register')
    Route.post('/login', 'UsersController.login')
    Route.post('/logout', 'UsersController.logout').middleware('auth:jwt')
    Route.post('/refresh-token', 'UsersController.refreshToken').middleware('auth:jwt')
  }).prefix('users')
  Route.group(() => {
    Route.get('/', 'JobController.index')
    Route.get('/:id', 'JobController.row')
  }).prefix('jobs').middleware('auth:jwt')
}).prefix('v1')

Route.get('/', async () => {
  return ResponseProviders({message: "Hello World"})
})
