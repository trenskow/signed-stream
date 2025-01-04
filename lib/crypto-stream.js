//
// crypto-stream.js
// @trenskow/signed-stream
//
// Created by Kristian Trenskow on 2024/12/31
// See license in LICENSE.
//

import { Transform } from 'stream';

export default class CryptoStream extends Transform {

	constructor({ digester }) {

		super();

		this._digester = digester;

		this._result = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});

		this.once('error', (error) => this._reject(error));

	}

	_transform(chunk, encoding, callback) {
		this._digester.update(chunk, encoding);
		callback();
	}

	_flush(callback) {
		this._digester.end();
		callback();
	}

}
