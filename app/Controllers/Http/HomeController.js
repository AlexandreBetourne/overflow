'use strict'

const Post = use("App/Models/Post");
const User = use("App/Models/User");
const axios = require('axios');


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
					posts.push({
						title: p.$attributes.title,
						body: p.$attributes.body,
						user: u.username,
						href: p.$attributes.slug,
						update: p.$attributes.updated_at
					})
				}
			})

		})


		// await Post.all().then(p => {
		// 	p.rows.forEach(postRow => {
		// 		User.all().then(u => {
		// 			u.rows.forEach(userRow => {
		//
		// 				if (postRow.$attributes.user_id == userRow.$attributes.id) {
		// 					posts.push({
		// 						title: postRow.$attributes.title,
		// 						body: postRow.$attributes.body,
		// 						user: userRow.$attributes.username,
		// 						href: postRow.$attributes.slug
		// 					})
		// 				}
		// 			})
		// 		})
		// 	})
		// })

		return view.render("home", { posts: posts });
	}
}

module.exports = HomeController