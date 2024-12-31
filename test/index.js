//
// index.js
// @trenskow/signed-stream
//
// Created by Kristian Trenskow on 2024/12/31
// See license in LICENSE.
//

import { use as chaiUse, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { SignStream, VerifyStream } from '../lib/index.js';

chaiUse(chaiAsPromised);

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkWbabVYrCCgEEoX1nNkk
crOi2K1KUjqBKxkuDzmtkslOYNUOQbqOmvdn3OFyjLvmE/G1EYPZPR63QPiBZOmY
SpntiwMbq2aYXYk/jhfyFcyWb4lQXjU6PlR1G/9imbRACgUw+v07XfeZTjb89af9
2HFJUHzwfj7Y5JUUTdqnLiQxlVE8lo+FecOiAx9nybmqMyJgYzfc2mZ9RkwNsTkN
ZcWGTnC+A2ulPg1cSAKdg9UdS9OmF4fZvdopOdHo4ujqL0H5GrVYcrSsaCkpKuAw
OaIVTT/AO8z3FCj61A14h5Sv4PlE2eBjKgaV1wqhyHdIgedRm09L8Q/VTSAyeSKT
LQIDAQAB
-----END PUBLIC KEY-----
`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRZtptVisIKAQS
hfWc2SRys6LYrUpSOoErGS4POa2SyU5g1Q5Buo6a92fc4XKMu+YT8bURg9k9HrdA
+IFk6ZhKme2LAxurZphdiT+OF/IVzJZviVBeNTo+VHUb/2KZtEAKBTD6/Ttd95lO
Nvz1p/3YcUlQfPB+PtjklRRN2qcuJDGVUTyWj4V5w6IDH2fJuaozImBjN9zaZn1G
TA2xOQ1lxYZOcL4Da6U+DVxIAp2D1R1L06YXh9m92ik50eji6OovQfkatVhytKxo
KSkq4DA5ohVNP8A7zPcUKPrUDXiHlK/g+UTZ4GMqBpXXCqHId0iB51GbT0vxD9VN
IDJ5IpMtAgMBAAECggEAEVQ/jJ/kLYrtX1LJYMntYuE/c5EFplK0MdGEsIpYgkHN
PlOuKQ3FsLjzTzssVpMPWwmn4aBD7Bmk0BC+BSuk+6EoUzTJ363w01cH9NSsRMZX
GJB2PGAeIq8YrP9NPlHh/v+65HL5WBvqEM0TbWi544mu6fGWDQnK+kU9QAEjAyfd
mfXMcxwvTnJIQGSEIuLZFBuPHTQpySi6XDWbx5HIEtdLpOr/ZCyaE9L4fOk2bgrY
v0ja75P6gGQUVBmnO9iSJam/iEL0qWKjWUXzb/pVpNGQjQqTlk5WzrqaGEYZaZkw
XIfdPEK+GIPXvKTu9OFLmdMyvNYx00acH/TWkYPJQQKBgQDKNW8QKGQUwlRzb9lL
2cd4TzngTRx5XWbv9cyKfeNFLpTTOPnLAY2njqQdclerimOq5KbNAJjMRG2AhoIQ
B/LS9uwqGnsSi7cbytU1o1By0fD4f8Qa4eDroXQ3MNEYDQhZfROwR1BOLLWnBrxs
UX8AnkHuxl3kOwm83wSKN6bvQQKBgQC4FNKyx4sr7uU9jEJleNMZtjLPqAFqHV4X
g4ORnagCv5Kdyg1YXAH8hiuC1LoiNADthwmj2z6YhRCzWLaYVDILk7/Btc2sqpms
o/BQxxiD/F7PSRdMy8+Ck3W36pTW8E6CEpLjPMhDfUG3g5CNEBzRWFdOEUbDYF4Z
uPnwVWYU7QKBgQCCJuiIxua8MeT3tGtyFgf9GUmQZTHJsGPcWiLAlYzeb8AdQJQP
pb1Ot1JNHdbuNBI44hm25AZ1nCm7S1iWBve18HdMFmVXJ5TBj8myT58teJIY8OwB
vZfvMqnCCGrdhy3zo70zfoNi/gYiLwTC16XeeP7JOOcgSxvWdNnQOUf6wQKBgFpb
VkUNL6IkBIBenaTDVxOS3IQTmoYk3i+6jVVnxrV6pZQwPra1iwASN79jfe4WCrKN
C01T6/jfsB/oltBU26/VGVYTUF7F6uLUIbz0zXLT6RHkdbxrenNEwI7DZcXPdSnh
xhomlsKR9DUJLmYfl5WmwEwArPRwFCCaLI0szgvNAoGANynPRUdLnINhUdv7vHe6
lvQPLogIRZgzXqDXkuwJgQ8nsdiNbTDNytM+/zx01sIPXTGUJuAvmfBbzN9N+eC7
Dq9kiUU5/UGYgCL/4jBd9UMt+yFRmenNGlzG1a5AK5HH4r0JZDBmXkI2lJYZeJcH
FHBT2ISmXltFrD0WwCc7SGs=
-----END PRIVATE KEY-----
`;

const signature = 'PvYGT2Uaf7oXjVgumXsTNxvxib/9KEL6ChqLcNfpAXilmxSfvsSB3F5i1LPCDildnYHPUaXzhTgglCRYgOVvjJnGYl/RoZbH3/YAdYuCXSkdHYTKDmkFdEUXb4BaDRtwd8JxWb1np/O1w+LEVfwymWdzm25ue/rdjtHkDxF740UZPWhp0BwlRbfIdm5ZqRpKC1zcRwqHzikwnDigV4nA3smkaiY9fR0Yozqla4IGTjce1h5tFnoLqPv+QXq2n8AyNPr5aqA5BlOef2ZDyTJtDjPQByaQu9UEbjQRdiwS9AItVTd2k3IhlBlMj0Sm2UmeRuDbmC2IcNWi5RncZgTXWg==';

describe('@trenskow/signed-stream', () => {

	it('should sign data', () => {

		const signStream = new SignStream({
			algorithm: 'SHA256',
			privateKey
		});

		signStream.write('Hello, World!');

		signStream.end();

		return expect(signStream.signature('base64')).to.eventually.be.equal(signature);

	});

	it('should verify data', () => {

		const verifyStream = new VerifyStream({
			algorithm: 'SHA256',
			publicKey,
			signature,
			encoding: 'base64'
		});

		verifyStream.write('Hello, World!');

		verifyStream.end();

		return expect(verifyStream.valid()).to.eventually.be.true;

	});

	it('should fail to verify data', () => {

		const verifyStream = new VerifyStream({
			algorithm: 'SHA256',
			publicKey,
			signature,
			encoding: 'base64'
		});

		verifyStream.write('Hello, Another World!');

		verifyStream.end();

		return expect(verifyStream.valid()).to.eventually.be.false;

	});

});
