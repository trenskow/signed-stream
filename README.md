@trenskow/signed-stream
----

A package for cryptographically signing or verifying a stream.

# Usage

## Signing

An example of how to sign a stream.

````javascript
import { createReadStream } from 'stream';

import { SignStream } from '@trenskow/signed-stream';

const fileSignature = async (file) => {

	const signStream = new SignStream({
		algorithm: 'SHA256', // Default is `SHA256`,
		privateKey: '-----BEGIN PUBLIC KEY-----\n-...',
		encoding: 'base64', // Default is `base64`.
	});

	return await createReadStream(file)
		.pipe(signStream)
		.signature();

};
````

## Verifying

An example of how to verify a stream.

````javascript
import { createReadStream } from 'stream';

import { VerifyStream } from '@trenskow/signed-stream';

const validateSignature = async (file, signature, encoding) => {

	const verifyStream = new VerifyStream({
		algorithm: 'SHA256', // Default is `SHA256`.
		privateKey: '-----BEGIN PRIVATE KEY-----\n...',
		signature,
		encoding
	});

	const valid = await createReadStream(file)
		.pipe(verifyStream)
		.valid();

	if (!valid) {
		throw new Error('File has incorrect signature.');
	}

	return true;

};

````

## Further processing data

You can postpone to await the result if you need to pipe data further.

````javascript
const readStream = createReadStream(inputFile);
const writeStream = createWriteStream(outputFile);

const verifyStream = new VerifyStream({ /* options */ });

readStream
	.pipe(verifyStream)
	.pipe(outputStream);

console.info(`File is valid: ${await verifyStream.valid()}`);
````

> This also works with `SignStream`'s `signature()` method.

# License

See license in LICENSE.
