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
