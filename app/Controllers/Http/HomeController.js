'use strict'

const Post = use("App/Models/Post");
const axios = require('axios');


class HomeController {
	async index({ view }) {
		const posts = []

		await Post.all().then(p => {
			p.rows.forEach(row => {
				posts.push({
					title: row.$attributes.title,
					body: row.$attributes.body,
					href: row.$attributes.slug
				})
			})
		})

		return view.render("home", { posts: posts });
	}
}

module.exports = HomeController