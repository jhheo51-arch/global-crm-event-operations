import {integer,sqliteTable,text} from 'drizzle-orm/sqlite-core';
export const events=sqliteTable('event_projects',{id:text('id').primaryKey(),name:text('name').notNull(),body:text('body').notNull(),revision:integer('revision').notNull(),updatedAt:text('updated_at').notNull()});
