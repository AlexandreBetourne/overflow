"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/")
	.render("home")
	.as("home");
Route.get("login", "UserController.index").as("login");
Route.post("login", "UserController.login")
	.middleware("guest")
	.as("auth.login");

Route.get("createPost", "PostController.index");
Route.post("createPost", "PostController.createPost").as("post.create");
