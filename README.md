# Desafio processo seletivo Urbis
Desafio do processo seletivo da Urbis, construir uma API em NodeJS e consumir com o ReactJS <br/>
Criar uma API em NodeJS com o objetivo de fazer um CRUD para cadastrar, listar, editar, deletar e trocar o estado da tarefa (concluido e não concluido). O projeto usa um sistema de login com autenticação usando JWT e usando o Express para as requisições.

## Iniciar aplicação
Depois que clonar o repositório, crie um arquivo _.env_ na raiz do backend com as seguintes informações necessárias.

```env
DB_HOST=                # Host do banco de dados
DB_USER=postgres        # Nome do usuário do banco de dados
DB_PASSWORD=            # Senha do banco de dados
DB_NAME=                # Nome do banco de dados
DB_DIALECT=postgres     # Dialect do banco de dados
DB_PORT=5432            # Porta do banco de dados

PORT=8081               # Porta do servidor
TOKEN_KEY_SECRET=       # Token do JWT
```

Depois dessas informações adicionadas, instale as dependencias do projeto com `npm install` em cada raiz dos projeto (backend e frontend). <br />

#### Backend
Para rodar a aplicação, utilize o `npm start` ou `yarn start` no backend
#### Frontend
Para rodar a aplicação, utilize o `npm start` ou `yarn start` no frontend

## Rotas
### Usuários
[POST] Cadastrar > http://localhost:8081/api/user <br/>
```json
{
	"name": "Isaque Veras",
	"email": "isaque@veras.com",
	"password": "123"
}
```

[POST] Login > http://localhost:8081/api/user/signin <br/>
``` json
{
	"email": "isaque@veras.com",
	"password": "123"
}
```

[PUT] Editar > http://localhost:8081/api/user/{id} <br/>
``` json
  {
    "name": "Isaque Veras",
    "email": "isaque@veras.com",
    "password": "123"
  }
```

[GET] Listar todos > http://localhost:8081/api/user <br/>
``` json
[
  {
    "id": "a2f712c8-21f6-492d-9e63-51aba37f677d",
    "name": "Isaque Veras",
    "email": "isaque@veras.com",
    "tasks": [
      {
        "id": "deae5413-b823-47c6-9dc7-94fe8aad794d",
        "title": "1° tarefa",
        "priority": "Facil",
        "isConcluded": true
      },
      {
        "id": "juth5413-b823-47c6-9dc7-69fe8ead794e",
        "title": "2° tarefa",
        "priority": "Medio",
        "isConcluded": false
      }
    ]
  }
]
```

[GET] Listar Um > http://localhost:8081/api/user/{id}
```json
{
  "id": "a2f712c8-21f6-492d-9e63-51aba37f677d",
  "name": "Isaque Veras",
  "email": "isaque@veras.com"
}
```

[DELETE] Excluir um > http://localhost:8081/api/user/{id} <br/>
```json
{
  "message": "O usuário foi excluído com sucesso!"
}
```

[DELETE] Excluir todos > http://localhost:8081/api/user/delete/all
```json
{
  "message": "7 usuários foram excluídos com sucesso!"
}
```

### Tarefas
[POST] Cadastrar > http://localhost:8081/api/task
```json
{
	"title": "1° tarefa",
	"priority": "Facil",
	"id_user": "a2f712c8-21f6-492d-9e63-51aba37f677d",
	"isConcluded": true
}
```

[GET] Listar todos (de um usuário) > http://localhost:8081/api/task/{id_usuario}
```json
[
  {
    "id": "deae5413-b823-47c6-9dc7-94fe8aad794d",
    "title": "1° tarefa",
    "priority": "Facil",
    "isConcluded": true,
    "user": {
      "id": "a2f712c8-21f6-492d-9e63-51aba37f677d",
      "name": "Isaque Veras"
    }
  }
]
```

[GET] Listar um > http://localhost:8081/api/task/list/{id}
```json
{
  "id": "deae5413-b823-47c6-9dc7-94fe8aad794d",
  "title": "1° tarefa",
  "priority": "Facil",
  "isConcluded": true
}
```

[PUT] Editar > http://localhost:8081/api/task/{id}
```json
{
	"isConcluded": false
}	
``` 
ou
```json
{
	"title": "1° tarefa",
	"priority": "Dificil",
	"id_user": "a2f712c8-21f6-492d-9e63-51aba37f677d",
	"isConcluded": false
}
```

[DELETE] Excluir um > http://localhost:8081/api/task/{id} <br />
```json
{
  "message": "A tarefa foi excluído com sucesso!"
}
```

[DELETE] Excluir todos > http://localhost:8081/api/task/delete/all <br/>
```json
{
  "message": "1 tarefa foi excluído com sucesso!"
}
```




