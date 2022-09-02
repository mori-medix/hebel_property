import polyfillLibrary from 'polyfill-library';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
polyfillLibrary.getPolyfillString({
	uaString: 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
	minify: false,
	features: {
		'Array.from': { flags: ['gated'] },
    'Object.assign': { flags: ['gated'] }
	}
}).then(function(bundleString) {
	fs.writeFile(`${__dirname}/src/assets/ts/polyfill-library.js`, bundleString, () => true);
});

// micromodal を使うときのpolyfill
// flags: ['gated'] Polyfill を実行するオプション
// 参考:https://developers.cyberagent.co.jp/blog/archives/30373/