# Rocket Log

Uma aplicação para gerenciamento de logs, desenvolvida com Node.js, TypeScript e Prisma.

## Funcionalidades

- **Gerenciamento de Logs**: Criação, leitura, atualização e exclusão de registros de log.
- **Autenticação de Usuário**: Registro e login seguros para usuários.
- **Integração com Banco de Dados**: Utiliza Prisma para operações com o banco de dados.

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Prisma**
- **Express**
- **JWT (JSON Web Token)**

## Pré-requisitos

- [Node.js](https://nodejs.org/) v14 ou superior
- [Docker](https://www.docker.com/) (para configuração do banco de dados em contêiner)

## Instalação

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/Lucasdias067/rocket-log.git
    cd rocket-log
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Configure o banco de dados**:

    Se estiver utilizando Docker, inicie o contêiner do banco de dados:

    ```bash
    docker-compose up -d
    ```

    Caso contrário, certifique-se de ter um banco de dados PostgreSQL em execução e atualize a variável `DATABASE_URL` no arquivo `.env` conforme necessário.

4. **Execute as migrações do banco de dados**:

    ```bash
    npx prisma migrate dev
    ```

5. **Inicie o servidor**:

    ```bash
    npm run dev
    ```

A aplicação estará acessível em [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis

No arquivo `package.json`, os seguintes scripts estão disponíveis:

- `dev`: Inicia o servidor de desenvolvimento utilizando TSX.
- `test`: Comando de teste (não especificado).

## Autor

- **Lucas Dias** - [GitHub](https://github.com/Lucasdias067)

## Licença

Este projeto está licenciado sob a licença ISC.
