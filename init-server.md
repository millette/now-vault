# Yo

## "nowsh server" starts
Knows its own url and the "vault server" url, but no secrets of any kind.

## Current setup
Admin (me) enters username/password at /init which is sent to the "vault server".

The "vault server" returns (after authentication) the necessary secrets.

Therefore, the admin manually initializes the exchange of secrets.

## Proposed setup
On start, "nowsh server" sends a nonce and its own url (env.NOW_URL)
and env.DEPLOYMENT_ID and env.AUTH_TOKEN
to the "vault server" on a public url with no auth.

The "vault server" checks the now.sh api for the "nowsh server" info.
If it checks out, the "vault server" returns the relevant secrets
to the "nowsh server" along with the nonce.

Finally, the "now server" verifies the nonce and if it checks out,
it uses those secrets to complete its initialization.

### Sequence diagram
![Sequence diagram](https://raw.githubusercontent.com/millette/now-vault/dance/sequence-diagram.png)

<https://bramp.github.io/js-sequence-diagrams/>

```
Note left of NowSh: Starting
NowSh->Vault: Hello(nonce, env)
Vault->NowAPI: Valid(env)
NowAPI-->Vault: OK (or not)
Note left of Vault: If OK
Vault-->NowSh: Send secrets\n and nonce
Note left of NowSh: Got nonce back?\n If so, initialize with secrets
```
