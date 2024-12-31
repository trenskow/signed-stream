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

	constructor({ algorithm, privateKey, encoding = 'base64' }) {

		const sign = createSign(algorithm);

		super({
			digester: sign
		});

		this._sign = sign;
		this._privateKey = privateKey;
		this._encoding = encoding;

	};

	_final(callback) {
		super._final(callback);

		this._resolve(this._sign.sign(this._privateKey).toString(this._encoding));

	}

	signature() {
		return this._result;
	}

};
