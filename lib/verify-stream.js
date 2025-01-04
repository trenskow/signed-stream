//
// verify-stream.js
// @trenskow/signed-stream
//
// Created by Kristian Trenskow on 2024/12/31
// See license in LICENSE.
//

import { createVerify } from 'crypto';

import CryptoStream from './crypto-stream.js';

export default class VerifyStream extends CryptoStream {

	constructor({ algorithm, publicKey, signature, encoding, errorFactory }) {

		const verify = createVerify(algorithm);

		super({
			digester: verify
		});

		this._verify = verify;
		this._publicKey = publicKey;
		this._signature = Buffer.from(signature, encoding);
		this._errorFactory = errorFactory;

	};

	_final(callback) {
		super._final(() => {

			let valid = false;

			try {
				valid = this._verify.verify(this._publicKey, this._signature);
			} catch (error) {
				this._reject(error);
				return callback(error);
			}

			this._resolve(valid);

			if (!valid && typeof this._errorFactory === 'function') {
				callback(this._errorFactory());
			} else {
				callback();
			}

		});
	}

	valid() {
		return this._result;
	}

};
