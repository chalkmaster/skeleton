# Pré-requisitos

ATENÇÃO: SEMPRE TRABALHE NA RAIZ DO PROJETO COM O VSCODE PARA TER AS CONFIGURAÇÒES CORRETAS DA IDE

ANGULAR VERSION: 9.1.0
NODE VERSION: 10.16.0
NPM VERSION: 6.9.0

``` 
  - Certifique-se que você tem permissão como Admin do PC
  - Saiba o que é e como funciona o Git - https://tableless.com.br/tudo-que-voce-queria-saber-sobre-git-e-github-mas-tinha-vergonha-de-perguntar/
  - Saiba o que é e como funciona o Prompt de comandos, cmd - https://faqinformatica.com/comandos-cmd/
  - Saiba o que é e como funciona o Npm - https://www.hostinger.com.br/tutoriais/o-que-e-npm
```

# Default .env file content
create your own .env file at path: /src/api/.env

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
  ## Git
  ```
  - Instale o Git - https://git-scm.com/download
  - Opcional: Instale o GIt client - https://git-scm.com/download/gui/windows
  ```

  ## NodeJS
  ### AngularCLI
  Para instalar o angular/cli globalmente:
  ```bash
  $ sudo npm uninstall -g angular-cli
  $npm install -g @angular/cli@latest
  ```

  ## Clone
  ```
  - Faço um clone do projeto via git (git clone)
  - Dica: crie uma pasta "projects" para receber seus projetos.
  ```

  ## Ambiente front
  ```
  - Instale o NodeJS - https://nodejs.org/en/download/
  - Instale o Angular cli - https://cli.angular.io/
    - npm install -g @angular/cli 
  - Instale o Docker (Para Windows, apenas na versão 10 PRO) - https://docs.docker.com/docker-for-windows/install/
    - Faça login ou crie sua conta e faça download;
    - Instale o docker e reinicie quando for solicitado (Geralmente pede pra reiniciar ao ativar o hyper-v no Windows 10)
    - Execute docker
    - No docker em execução, acesse settings > Shared drives > Selecione o drive C:/ (ou onde está o projeto) e clique em apply.

  - Execute o comando npm install via CMD, nas pastas:
    - people_registration/src/client/
    - people_registration/src/api/
  ```

  ## IDE
  ```
  - Recomendamos o Visual Studio Code - https://code.visualstudio.com/download
  - Extensoes para VS Code:
    - TSLint: ms-vscode.vscode-typescript-tslint-plugin (obs.: Desabilitar ESLint, para evitar conflitos)
    - GitLens: eamodio.gitlens
    - Angular Language Service: angular.ng-template
    - Nuget: NuGet Package Manager: jmrog.vscode-nuget-package-manager
    - Docker
  ```

# Executando
  ```
  ## Interface/Client
    - Na pasta "./src/client/", execute o comando "ng serve --open" ou "ng s --open" via CMD
    
  ## API
    - Na pasta "./src/api/" execute o comando "docker-compose up --build" ou "ng s --open" via CMD

  ## Gerenciando dados
    - Caso precise gerenciar (limpar) a base local no mongo, use o robo 3t
  ```  
  
# Documentações para Consulta
```
  - Angular material - https://material.angular.io/
  - Angular - https://angular.io/docs
  - Google Material Icons - https://google.github.io/material-design-icons/
  - Material Icons  - https://material.angular.io/components/icon
```

# SQLServer via docker
```
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=pass' -p 1433:1433 -d mcr.microsoft.com/mssql/server
```
  

