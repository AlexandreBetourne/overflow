"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TagsSchema extends Schema {
	up() {
		this.create("tags", table => {
			table.increments();
			table.timestamps();
			table.string("slug").notNullable().unique();
			table.string("name").notNullable().unique();
		});
	}

	down() {
		this.drop("tags");
	}
}

module.exports = TagsSchema;