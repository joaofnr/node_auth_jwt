# Change Log
I'm keeping track of changes on this file... Well, at least for now

## v1.0.1 - 20221-07-15
My first goal when i looked for a JWT tutorial was to be able to use Bearer token authentication for companies with a pair of keys. The idea is to match the provided token (secret) with a stored token for the account and get the public key, that can be exposed to final users.

That way, a company (or any legal person) will get the secret/public keys under a contract so the IT team can use the secret token to execute private routines and get the public key to other routines that can be open to the public.

### Added
Account model and route created with a endpoint /getToken with bearer token authentication