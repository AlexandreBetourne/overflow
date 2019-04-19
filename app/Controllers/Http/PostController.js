"use strict";

const Post = use("App/Models/Post");
const slugify = require("slugify");

class PostController {
	index({ view }) {
		return view.render("createPost");
	}

	async createPost({ auth, request, session, response }) {
		const { title, body, tag } = request.all();

		const post = new Post();

		var sluged = slugify(title);

		post.fill({
			title,
			body,
			slug: sluged,
			tag_id: 1,
			user_id: auth.user.id
		});

		await post.save();

		return slugify(title);
	}
}

module.exports = PostController;
