//
// sign-stream.js
// @trenskow/signed-stream
//
// Created by Kristian Trenskow on 2024/12/31
// See license in LICENSE.
//

import { createSign } from 'crypto';

import CryptoStream from './crypto-stream.js';

export default class SignStream extends CryptoStream {

	constructor({ algorithm, privateKey, errorFactory }) {

		const sign = createSign(algorithm);

		super({
			digester: sign,
			errorFactory
		});

		this._sign = sign;
		this._privateKey = privateKey;

	};

	_final(callback) {
		super._final(() => {

			let result;

			try {
				result = this._sign.sign(this._privateKey);
			} catch (error) {
				this._reject(error);
				return callback(error);
			}

			this._resolve(result);

			callback();

		});

	}

	signature(encoding) {
		return this._result
			.then((signature) => (typeof encoding === 'string') ? signature.toString(encoding) : signature);
	}

};
