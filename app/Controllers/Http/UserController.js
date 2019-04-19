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

		return "Welcome" + username;
	}

	// show ({ auth, params }) {
	//   if (auth.user.id !== Number(params.id)) {
	//     return "You cannot see someone else's profile"
	//   }
	//   return auth.user
	// }
}

module.exports = UserController;
