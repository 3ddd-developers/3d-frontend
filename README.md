# 3d-frontend

Dependencies
-------------
1. node.js ^12.16.3
2. yarn ^1.22.4

How to execute (Run below commands from root directory)
-------------
1. `git clone https://github.com/3ddd-developers/3d-frontend.git`
2. `yarn install`
3. `yarn start` 
4. Access 'https://localhost:9000' through browser.

How to test Login with GitHub account
-------------
1. Access 'https://github.com/settings/developers' 
2. click 'New OAuth App'
3. Enter 'https://localhost:9000' in Homepage URL, Authorization callback URL section. 
4. click 'Register application', then copy generated 'Client ID' and 'Client secret', paste them on line 6, line 7 respectively of 'config.js' file in the root directory. 