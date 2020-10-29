# 3d-frontend

Quickstart
-------------
Dependencies:
1. node.js ^12.16.3
2. yarn ^1.22.4

How to execute:
1. `yarn install`
2. `yarn start` 
3. Access 'https://localhost:9000' through browser.

How to test Login with GitHub account:
1. Access 'https://github.com/settings/developers' 
2. click 'New OAuth App'
3. Enter 'https://localhost:9000' in Homepage URL, Authorization callback URL section. 
4. click 'Register application', then copy 'Client ID' and 'Client secret', paste them in 'config.js' file in the root directory. 