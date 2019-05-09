'use strict'

const Post = use("App/Models/Post");
const User = use("App/Models/User");
const moment = require('moment');


class HomeController {
	async index({ view }) {
		var postsPromise = await Post.query().fetch()
		var usersPromise = await User.query().fetch()
		var posts = []
		var users = []

		usersPromise.rows.forEach(u => {
			users.push(u.$attributes)
		})

		postsPromise.rows.forEach(p => {
			users.forEach(u => {
				if (u.id === p.$attributes.user_id) {
					var updated = moment(p.$attributes.updated_at).calendar()
					posts.push({
						title: p.$attributes.title,
						body: p.$attributes.body,
						user: u.username,
						href: p.$attributes.slug,
						updated
					})
				}
			})

		})


		return view.render("home", { posts: posts });
	}
}

module.exports = HomeController