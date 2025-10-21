import { csvReader } from './csv-reader.js';

async function importCsv() {
	const tasks = await csvReader();

	for (const task of tasks) {
		const response = await fetch('http://localhost:3333/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		});
	}
}

await importCsv();
