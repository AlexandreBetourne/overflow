"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("home");
Route.get("login", "UserController.index");
Route.post("login", "UserController.login")
	.middleware("guest")
	.as("auth.login");

// Route.get('users/:id', 'UserController.show').middleware('auth')
