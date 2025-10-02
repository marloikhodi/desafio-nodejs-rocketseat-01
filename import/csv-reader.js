import fs from 'node:fs';
import { parse } from 'csv-parse';

export async function csvReader() {
	const req = [];

	const parser = fs.createReadStream('import/import.csv').pipe(
		parse({
			delimiter: ',',
			from_line: 2,
		}),
	);

	for await (const record of parser) {
		req.push({
			title: record[0],
			description: record[1],
		});
	}
	
	return req;
}
