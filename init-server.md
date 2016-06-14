# Yo

## "nowsh server" starts
Knows its own url and the "vault server" url, but no secrets of any kind.

## Current setup
Admin (me) enters username/password at /init which is sent to the "vault server".

The "vault server" returns (after authentication) the necessary secrets.

Therefore, the admin manually initializes the exchange of secrets.

## Proposed setup
On start, "nowsh server" sends a random key and its own url
to the "vault server" on a public url with no auth.

The "vault server" checks the now.sh api for the "nowsh server" info.
