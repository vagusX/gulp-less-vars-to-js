import path from 'path';
import test from 'ava';
import Vinyl from 'vinyl';
import pEvent from 'p-event';
import fn from '.';

test(async t => {
	const stream = fn();
	const promise = pEvent(stream, 'data');

	stream.end(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'file.less'),
		contents: Buffer.from(`@btn-bg: red; @btn-color: white;`),
	}));

	const file = await promise;
	const ret = {
		'btn-bg': 'red',
		'btn-color': 'white',
	};
	t.is(file.contents.toString(), `module.exports = {
  "btn-bg": "red",
  "btn-color": "white"
}`.trim());
});
