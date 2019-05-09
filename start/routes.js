"use strict";
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use("Route");

Route.get("/", "HomeController.index").as("home");

Route.get("login", "UserController.index").as("login");
Route.post("login", "UserController.login").middleware("guest").as("auth.login");
Route.post("logout", "UserController.logout").as("auth.logout");

Route.get("createPost", "PostController.index");
Route.post("createPost", "PostController.createPost").as("post.create");
Route.get("post/:name", "PostController.getPost").as("post.get");