import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('directus_files', (table) => {
		table.dropForeign(['uploaded_by']);
		table.foreign('uploaded_by').references('id').inTable('directus_users').onDelete('SET NULL');
		table.dropForeign(['modified_by']);
		table.foreign('modified_by').references('id').inTable('directus_users').onDelete('SET NULL');
	});

	await knex.schema.alterTable('directus_notifications', (table) => {
		table.dropForeign(['sender'], 'directus_notifications_sender_foreign');
		table.foreign('sender').references('id').inTable('directus_users').onDelete('SET NULL');
	});

	await knex.schema.alterTable('directus_versions', (table) => {
		table.dropForeign(['user_updated']);
		table.foreign('user_updated').references('id').inTable('directus_users').onDelete('SET NULL');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('directus_files', (table) => {
		table.dropForeign(['uploaded_by']);
		table.foreign('uploaded_by').references('id').inTable('directus_users');
		table.dropForeign(['modified_by']);
		table.foreign('modified_by').references('id').inTable('directus_users');
	});

	await knex.schema.alterTable('directus_notifications', (table) => {
		table.dropForeign(['sender']);
		table.foreign('sender').references('id').inTable('directus_users');
	});

	await knex.schema.alterTable('directus_versions', (table) => {
		table.dropForeign(['user_updated']);
		table.foreign('user_updated').references('id').inTable('directus_users');
	});
}
