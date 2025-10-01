import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();
const currentDateTime = new Date().toLocaleString('pt-br');

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { search } = req.query;
			const tasks = database.select(
				'tasks',
				search
					? {
							title: search,
							description: search,
						}
					: null,
			);
			return res.end(JSON.stringify(tasks));
		},
	},

	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { title, description } = req.body;

			if (!title || !description) {
				return res.writeHead(422).end('Missing title or description');
			}

			const task = {
				id: randomUUID(),
				title,
				description,
				completed_at: null,
				created_at: currentDateTime,
				updated_at: currentDateTime,
			};

			database.insert('tasks', task);
			return res.writeHead(201).end();
		},
	},
];
