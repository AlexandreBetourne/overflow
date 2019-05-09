"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");

class UserController {
	index({ view }) {
		return view.render("login");
	}

	async login({ auth, request, session, response }) {
		const { email, password, username } = request.all();

		const rules = {
			email: "required|email|unique:users,email",
			username: "required|unique:users,username",
			password: "required"
		};

		const validation = await validateAll(request.all(), rules);

		if (validation.fails()) {
			session.withErrors(validation.messages()).flashAll();
			return response.redirect("back");
		}

		const user = new User();

		user.fill({
			email,
			username,
			password
		});

		await user.save();
		await auth.attempt(email, password);

		return response.route("home");
	}

	async logout({ auth, response }) {
		await auth.logout()

		console.log("logout");

		return response.route("home");
	}
}

module.exports = UserController;