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

	constructor({ algorithm, publicKey, signature, encoding }) {

		const verify = createVerify(algorithm);

		super({
			digester: verify
		});

		this._verify = verify;
		this._publicKey = publicKey;
		this._signature = Buffer.from(signature, encoding);

	};

	_final(callback) {
		super._final(callback);

		this._resolve(this._verify.verify(this._publicKey, this._signature));

	}

};
