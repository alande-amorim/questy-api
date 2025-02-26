# Aplicação NestJS

Esta é uma aplicação backend construída com NestJS, utilizando Node.js 20 e gerenciada com pnpm.

## Pré-requisitos

- [Node.js 20](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (opcional, para execução via container)
- [Docker Compose](https://docs.docker.com/compose/) (opcional, para orquestração com múltiplos containers)


## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

### Desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento (com _hot-reload_):

```bash
pnpm run start:dev
```

### Build
Para compilar a aplicação (transpilando TypeScript para JavaScript):

```bash
pnpm run build
```
Os arquivos compilados serão gerados na pasta dist/.

### Testes
Para executar os testes da aplicação:

```bash
pnpm run test
```
Para rodar os testes em modo watch (para execução contínua durante o desenvolvimento):

```bash
pnpm run test:watch
```

### Variáveis de Ambiente
Caso seja necessário, crie um arquivo .env na raiz do projeto para configurar variáveis de ambiente. Exemplo:

```dotenv
NODE_ENV=development
PORT=3000
```
Ajuste as variáveis conforme a necessidade do seu ambiente.


# Usando com Docker
A aplicação já vem configurada para ser executada via Docker. Você pode utilizar tanto o Dockerfile quanto o docker-compose para facilitar o desenvolvimento ou a implantação.

## Executando com Dockerfile
Construir a imagem:

```bash
docker build -t nestjs-app .
```
Executar o container:

```bash
docker run -p 3000:3000 nestjs-app
```
A aplicação ficará disponível em http://localhost:3000.

## Executando com Docker Compose
Caso prefira usar o Docker Compose, certifique-se de que o arquivo docker-compose.yml está na raiz do projeto com a configuração adequada. Em seguida, execute:

```bash
docker-compose up --build
```
A aplicação também ficará disponível em http://localhost:3000.

