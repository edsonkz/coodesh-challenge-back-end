# Back-end Challenge 🏅 2021 - Space Flight News
Implementação utilizando Node.js do desafio Back-end Challenge 🏅 2021 - Space Flight News da coodesh. O desafio trata-se da implementar uma API RESTful baseada na API [Space Flight News](https://api.spaceflightnewsapi.net/v3/documentation).
## Frameworks e Tecnologias Utilizadas
* Javascript utilizando Ambiente Node.js como base
* Banco de dados MongoDB utilizando o sistema cloud Atlas
  * Mongoose como driver do MongoDB
  * Mongoose-sequence (utilizado para a criação do id incremental) e Mongoose-paginate (uso de paginação no endpoint `/articles` para não sobrecarregar a consulta)
* Express.js para criação da API e de suas rotas
* Esm para poder utilizar padrões ECMAScript na confecção do código
* Cross-env para utilizar variáveis de ambiente pelo Windows
* Tape e Supertest para criação dos teste referentes aos endpoints da API
* Node-cron para criação do CRON que sicroniza com a API Space Flight News e adiciona novos artigos ao banco de dados
* Dotenv para utilizar um arquivo .env com variáveis ambientais
* Axios utilizado tanto no CRON como no código de popular o banco de dados para fazer consultas a API Space Flight News
# Instalação e Execução
É necessário possuir o ambiente Node.js instalado para executar este projeto. Versões Node.js testadas: v16.13.2 e v13.14.0.
A aplicação principal roda no PORT 3333 e o cron no PORT 1314.
1. Clonar este repositóiro
2. No momento, este projeto apenas funciona com MongoDB, logo é necessário criar um arquivo .env na pasta raiz de seu projeto e inserir nele duas variáveis de ambiente:
    * MONGODB_URL (recebe a url de conexão do banco de produção)
    * MONGODB_URL_MOCK (recebe a url de conexão do banco de testes, necessário para se fazer testes) 
3. Utilizar `npm install` na pasta raiz do projeto pelo seu terminal preferido
4. Agora você pode utilizar os comandos:
    * `npm start` para iniciar a aplicação em modo produção. Utilize `Ctrl + C` para finalizar a aplicação no terminal em que a mesma está executando.
    * `npm test` para testar os endpoints da aplicação.
    * `npm run cron` para ativar o cron que irá executar todos os dias as 9 horas da manhã para atualizar o banco de dados com novos artigos da API Space Flight News.
    * `npm run populate` para popular o banco de dados (recomendável utilizar apenas uma única vez e quando desejar atualizar o banco, utilizar o cron).
Outro forma de executar é utilizando o docker por meio da `Dockerfile` contida neste repositório. Necessita do Docker instalado.
1. Pode utilizar o comando `docker build --tag node-docker .` para contruir a imagem.
2. Utilize `docker run --publish 3333:3333 node-docker` para criar o container e executa-lo.
# Rotas
* `[GET]/:`  Retornar um Status: 200 e uma Mensagem "Back-end Challenge 2021 🏅 - Space Flight News"
* `[GET]/articles/:`   Listar todos os artigos da base de dados, utilizar o sistema de paginação para não sobrecarregar a REQUEST
* `[GET]/articles/{id}:` Obter a informação somente de um artigo
* `[POST]/articles/:` Adicionar um novo artigo
* `[PUT]/articles/{id}:` Atualizar um artigo baseado no id
* `[DELETE]/articles/{id}:` Remover um artigo baseado no id
>This is a challenge by [Coodesh](https://coodesh.com/)
