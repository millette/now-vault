# Now vault

[now][] est un nouveau service pour héberger des services node
et des fichiers statiques. On peut l'utiliser gratuitement ou payer
pour plus de fonctions, comme des noms de domaine.

L'hébergement gratuit est destiné aux développeurs de logiciels libres
et offre automatiquement les sources de tous les fichiers hébergés.
L'option payante permet de garders les sources du serveur secret.

Cependant, si le logiciel libre que vous développez utilise par exemple
Github comme *3rd party login*, il n'y a pas d'endroit sécure pour
stocker les tokens et secrets nécessaires pour communiquer avec Github.

L'équipe de [zeit][] qui développe [now][] compte bientôt offrir
une fonction pour les données secrètes. D'ici là, on peut payer
pour le service, ce qui élimine la publication des sources, ou encore
vous pouvez faire comme moi et utiliser un second serveur web https
pour y lire vos secrets.

J'avais un serveur apache httpd avec TLS/SSL grâce à [Lets Encrypt][]
que j'ai décidé de réutiliser pour mon coffre-fort (now vault).

J'ai fais un mini service avec node et j'utilise Apache httpd pour faire
un reverse proxy:

```
<Location "/now-vault/">
  AuthType Basic
  AuthName "Restricted Files"
  AuthBasicProvider file
  AuthUserFile "/home/millette/now-vault/passwords"
  Require valid-user
  ProxyPass "http://127.0.0.1:3000/"
  ProxyPassReverse "http://127.0.0.1:3000/"
</Location>
```

Notez que le mini service node n'écoute que sur localhost/127.0.0.1 et
n'est pas disponible directement sur internet.

## L'application
Du côté de l'application hébergé sur [now][], j'ai fais une route /init
qui demande un *username* et mot de passe. Ceux-ci sont envoyés au
mini service qui les valide et renvoit le contenu de son coffre
de façon sécuritaire, toujours par https.

Une fois qu'on est passé par /init il se produit 3 choses:
* cette route n'est plus disponible
* l'utilisateur avec le username transmis est créé sans mot de passe
* l'utilisateur admin est loggué et doit offrir un nouveau mot de passe

[now]: <http://now.sh/>
[zeit]: <https://zeit.co/>
[Lets Encrypt]: <https://letsencrypt.org/>