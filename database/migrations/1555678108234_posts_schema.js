"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostsSchema extends Schema {
	up() {
		this.create("posts", table => {
			table.increments();
			table.timestamps();

			table.string("title");
			table.string("slug").unique();
			table.text("body");
			table
				.integer("user_id")
				.unsigned()
				.index();
			table
				.integer("tag_id")
				.unsigned()
				.index();

			table
				.integer("parent_id")
				.unsigned()
				.index();

			table.foreign("user_id").references("users.id");
			table.foreign("tag_id").references("tags.id");
		});
	}

	down() {
		this.drop("posts");
	}
}

module.exports = PostsSchema;
