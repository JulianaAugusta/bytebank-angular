# Bytebank Angular | Tech Challenge: Front-End Engineering (FIAP)

Aplicação web desenvolvida em Angular para simulação de operações bancárias.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura do Projeto (Scaffold)](#estrutura-do-projeto-scaffold)
- [Dependências Principais](#dependências-principais)
- [Como Executar](#como-executar)
- [Scripts Disponíveis](#scripts-disponíveis)

## Sobre o Projeto

Este projeto foi desenvolvido utilizando Angular e tem como objetivo demonstrar conceitos de SPA (Single Page Application), consumo de APIs, utilização de formulários reativos, autenticação, componentização e boas práticas de front-end.

## Estrutura do Projeto (Scaffold)

Abaixo está a estrutura de diretórios do projeto, com uma breve descrição de cada parte:

```
├── README.md
├── angular.json                # Configuração do Angular CLI
├── eslint.config.mjs           # Configuração do ESLint para análise de código
├── package-lock.json           # Lockfile do NPM (controle das versões exatas das dependências)
├── package.json                # Lista de dependências e scripts
├── public/
│   └── favicon.ico             # Ícone do site
├── src/
│   ├── app/
│   │   ├── app.component.*     # Componente raiz da aplicação
│   │   ├── app.config.ts       # Arquivo de configuração principal
│   │   ├── app.routes.ts       # Definição das rotas principais
│   │   ├── components/         # Componentes de UI como saldo, nova transação, extrato etc.
│   │   │   └── ...             # Subpastas para componentes específicos
│   │   ├── core/               # Código central, incluindo guards, interceptors, modelos, serviços de autenticação e transação
│   │   │   ├── guards/         # Proteção de rotas (ex: auth.guard.ts)
│   │   │   ├── interceptors/   # Interceptação de requisições HTTP
│   │   │   ├── interfaces/     # Definições de interfaces TypeScript
│   │   │   ├── models/         # Modelos de dados centrais
│   │   │   └── services/       # Serviços para lógica de negócio e integração com APIs
│   │   ├── pages/              # Componentes de página (home, login, dashboard, base)
│   │   │   └── ...             # Cada página tem seus próprios arquivos de componente
│   │   └── shared/             # Recursos compartilhados
│   │       ├── components/     # Componentes reutilizáveis (footer, navbar, sidebar)
│   │       ├── models/         # Modelos de dados compartilhados
│   │       ├── pipes/          # Pipes personalizados (ex: formatação de moeda)
│   │       ├── services/       # Serviços compartilhados (ex: notificações)
│   │       └── utils/          # Funções utilitárias
│   ├── assets/
│   │   ├── icons/              # Ícones SVG utilizados pela aplicação
│   │   ├── images/             # Imagens usadas na interface (logo, banners, etc)
│   │   └── styles/             # Estilos globais e variáveis SCSS
│   ├── index.html              # HTML principal da aplicação
│   ├── main.ts                 # Ponto de entrada do Angular
│   └── styles.scss             # Estilo global da aplicação
├── tsconfig.app.json           # Configuração do TypeScript para a aplicação
├── tsconfig.json               # Configuração base do TypeScript
└── tsconfig.spec.json          # Configuração do TypeScript para testes
```

### Descrição das principais pastas/arquivos:

- **app/**: Contém toda a lógica da aplicação, dividida em componentes, páginas, serviços, modelos e utilitários.
- **core/**: Centraliza serviços de autenticação, guards, interceptors e modelos principais.
- **shared/**: Elementos reutilizáveis, como componentes, pipes e serviços de apoio.
- **pages/**: Componentes de página (home, dashboard, login, etc).
- **components/**: Componentes funcionais e de interface, como saldo, extrato, etc.
- **assets/**: Imagens, ícones e estilos globais.
- **angular.json**: Configuração de build, serve e testes da aplicação Angular.
- **package.json**: Lista de dependências e scripts de execução.
- **tsconfig.json**: Configuração do compilador TypeScript.

## Dependências Principais

Entre as dependências principais extraídas do `package.json` estão:

### Dependências

- `@angular/forms`: Criação e gerenciamento de formulários reativos e template-driven.
- `@angular/material`: Biblioteca de componentes de UI seguindo o Material Design.
- `angular-in-memory-web-api`: Simulação de API REST para desenvolvimento e testes.
- `lodash`: Utilitários para manipulação de dados.
- `ngx-mask`: Máscara de entrada para campos de formulários.
- `rxjs`: Programação reativa e gerenciamento de streams.
- `sweetalert2`: Alertas e pop-ups personalizados para feedback ao usuário.

## Como Executar

1. Instale as dependências:

```bash
npm install
```

2. Rode a aplicação localmente:

```bash
npm run start
```

Acesse em: [http://localhost:4200](http://localhost:4200)

## Scripts Disponíveis

- `ng serve` - Inicia o servidor de desenvolvimento.
- `ng build` - Realiza o build do projeto para produção.
- `ng test` - Executa os testes unitários.
- `ng lint` - Roda o linter para análise estática de código.

---
