"use strict";

const Post = use("App/Models/Post");
const User = use("App/Models/User");
const slugify = require("slugify");
const moment = require('moment');

class PostController {
	index({ view }) {
		return view.render("createPost");
	}

	async createPost({ auth, request, session, response }) {
		const { title, body, tag } = request.all();
		if (auth.user) {
			const post = new Post();

			post.fill({
				title,
				body,
				slug: slugify(title),
				tag_id: 1,
				user_id: auth.user.id
			});

			await post.save();

			return response.route("home");
		} else {
			return response.route("login");
		}
	}

	async getPost({ params, view }) {
		var postsPromise = await Post.query().fetch()
		var usersPromise = await User.query().fetch()
		var post = "hello"
		var users = []

		usersPromise.rows.forEach(u => {
			users.push(u.$attributes)
		})

		postsPromise.rows.forEach(p => {

			if (params.name === p.$attributes.slug) {

				users.forEach(u => {

					if (u.id === p.$attributes.user_id) {

						var updated = moment(p.$attributes.updated_at).calendar()

						post = {
							title: p.$attributes.title,
							body: p.$attributes.body,
							user: u.username,
							href: p.$attributes.slug,
							updated
						}
					}
				})
			}
		})

		return view.render("post", { post: post });
	}
}

module.exports = PostController;