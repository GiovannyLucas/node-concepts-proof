# node-cp
> The code to a node API to the Compass Interview.

## How to run 🚀

## Requirements

<details>
  <summary>Cadastrar cidade</summary>
  
  | FR (functional requirements) | NFR (non-functional requirements) | OK |
  |------------------------------|-----------------------------------|----------------|
  | Deve ser possível cadastrar uma nova cidade ao informar corretamente os dados pedidos | | ✅ |
  | Não é possível cadastrar duas ou mais cidades com o mesmo nome e o mesmo estado | | ✅ |
</details>

<details>
  <summary>Consultar cidade pelo nome e/ou estado</summary>

  | FR (functional requirements) | NFR (non-functional requirements) | OK |
  |------------------------------|-----------------------------------|----------------|
  | Deve ser possível buscar uma cidade informando seu nome e/ou o estado a qual pertence | Pode utilizar parametros de query para filtrar | ✅ |
  | Ao não informar dados para o filtro, poderão ser trazidas todas as cidades | Deverá conter paginação para controle | ✅ |
</details>

<details>
  <summary>Cadastrar cliente</summary>

  | FR (functional requirements) | NFR (non-functional requirements) | OK |
  |------------------------------|-----------------------------------|----------------|
  | Deve ser possível cadastrar um novo cliente ao informar corretamente os dados pedidos | | ✅ |
  | Cada cliente deverá ter uma cidade associada (cidade onde mora) | | ✅ |
  | Não será possível cadastrar um cliente com data de nascimento maior que a data de hoje | | ✅ |
</details>

<details>
  <summary>Consultar cliente pelo nome</summary>

  | FR (functional requirements) | NFR (non-functional requirements) | OK |
  |------------------------------|-----------------------------------|----------------|
  | Deve ser possível buscar clientes informando seu nome (ou parte) | Pode utilizar parametros de query para filtrar ou parâmetro de rota | ✅ |
</details>

<details>
  <summary>Consultar cliente pelo Id</summary>

  | FR (functional requirements) | NFR (non-functional requirements) | OK |
  |------------------------------|-----------------------------------|----------------|
  | Deve ser possível buscar um cliente específico informando seu identificador | Utilizar parâmetros de rota | ✅ |
</details>

<details>
  <summary>Remover cliente</summary>

  | FR (functional requirements) | NFR (non-functional requirements) | OK |
  |------------------------------|-----------------------------------|----------------|
  | Deve ser possível remover um cliente informando seu identificador | Utilizar parâmetros de rota | ✅ |
  | Não será possível remover um cliente cujo não seja identificado | | ✅ |
</details>

<details>
  <summary>Alterar o nome do cliente</summary>

  | FR (functional requirements) | NFR (non-functional requirements) | OK |
  |------------------------------|-----------------------------------|----------------|
  | Deve ser possível alterar o nome do cliente | Utilizar parâmetros de rota | |
</details>