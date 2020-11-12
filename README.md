# Versions

ANGULAR VERSION: 9.1.0
NODE VERSION: 10.16.0
NPM VERSION: 6.9.0

# Default .env file content
create your own .env file at: ./src/api/.env

```
JWT_SECRET=hello_nurse
JWT_TOKEN_EXPIRATION_SECONDS=60
QUOTA_DURATION=100
LOGIN_ATTEMPTS_DURATION=60
MAX_QUOTA=100
MAX_LOGIN_ATTEMPTS=5
NODE_ENV=development
PORT=6001
REDIS_URL=redis://localhost
SMS_TOKEN_EXPIRATION_SECONDS=15
SESSION_EXPIRATION_SECONDS=300
UUID_DNS=skeleton.mydomain.com.br
VERSION=dev::lastest
```

# Setup
  ## IDE

  - VSCode download URL - ```https://code.visualstudio.com/download```

  - Recomended VSCode plugins:
    - ESLint: ```dbaeumer.vscode-eslint```
    - GitLens: ```eamodio.gitlens```
    - Angular Language Service: ```angular.ng-template```
    - Angular Snippets (Version 9): ```johnpapa.angular2```
    - Nuget: NuGet Package Manager: ```jmrog.vscode-nuget-package-manager```
    - Docker: ```ms-azuretools.vscode-docker```
    - SCSS Everywhere: ```gencer.html-slim-scss-css-class-completion```
    - SCSS Formatter: ```sibiraj-s.vscode-scss-formatter```
    - Visual Studio IntelliCode: ```visualstudioexptteam.vscodeintellicode```

# Running in dev
  ## Client
   - execute ```ng s``` on ```./src/client/```

  ## API
  - execute ```npm start``` on ```./src/api/```

  ## run redis server
  - pull redis using ```docker pull redis``` on terminal
  - start redis on docker unsing default values (if you are using the Docker plugin on vscode, you can just right click on there and then click on start)

# Using docker compose

- Use docker-compose up to put all enviroment up
- test using docker compose before put it on hml/prd