#!/usr/bin/env -S deno --allow-net --allow-read
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { serve } from 'https://deno.land/std/http/server.ts';
import * as Colors from 'https://deno.land/std/fmt/colors.ts';

const args = parse(Deno.args);

const options = {
	download: args.download || args.d || args.D,
	port: args.port || args.p || args.P,
	help: args.help || args.h || args.H,
};
if (!options.help) {
	let port: number = 3000;
	if (options.port && typeof options.port === 'number') port = options.port;
	if (options.download)
		console.log(Colors.blue(Colors.bold('Running with download')));

	console.log(Colors.green(`Running on port ${port}`));
	const server = serve({ port });

	const decoder = new TextDecoder('utf-8');

	for await (const req of server) {
		console.log(req.url.slice(1));

		if (options.download) {
			let headers = new Headers();

			headers.set(
				'Content-disposition',
				`attachment; filename=${req.url.substring(
					req.url.lastIndexOf('/') + 1
				)}`
			);

			req.respond({
				body: await Deno.readFile(req.url.slice(1)),
				headers,
			});
		} else {
			req.respond({
				body: decoder.decode(await Deno.readFile(req.url.slice(1))),
			});
		}
	}
} else {
	console.log(
		'Servey is a simple static files server:\n\
		--help, -h: shows this message\n\
		--download, -d: enables file download\n\
		--port <port>, -p <port>: changes the default port from 300 to <port>\
	'
	);
}
