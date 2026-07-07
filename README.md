# 🛒 MVP - API de Gerenciamento de Pedidos

Esta é uma API RESTful desenvolvida em Node.js para o gerenciamento de pedidos de uma empresa, atendendo aos requisitos de Produto Mínimo Viável (MVP). O projeto aplica rigorosamente padrões arquiteturais em camadas (Controller, Service, Repository) e validações de regras de negócio estritas.

## 🏗️ Arquitetura do Projeto

O sistema foi estruturado seguindo o padrão de separação de responsabilidades:

```mermaid
graph TD
    A[Cliente / Insomnia] -->|Requisição HTTP| B(Router / App.js)
    B -->|Encaminha Dados| C{Service}
    C -->|Valida Regras de Negócio| D[(Repository)]
    D -->|Persiste Dados em Memória| C
    C -->|Retorna Resultado| B
    B -->|Resposta HTTP| A
