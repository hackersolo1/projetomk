# Projeto MK - Controle Diário de Medicamentos

Este é um gerenciador de cronograma diário de medicamentos desenvolvido com foco em acessibilidade (WCAG 2.1 AA), alto contraste e facilidade de uso para idosos. A persistência de dados é feita em tempo real através da integração com o banco de dados PostgreSQL do **Supabase**.

---

## 🚀 Funcionalidades

- **Layout de Alto Contraste & Acessibilidade**: Cores otimizadas para evitar fadiga visual e fontes ampliadas (mínimo de 18px), facilitando a leitura por pessoas da terceira idade.
- **Divisão por Período do Dia**: Visualização intuitiva separada por Manhã, Tarde, Tarde-Noite e Noite com cores representativas específicas.
- **Google Material Icons**: Substituição completa de SVGs por ícones de fonte do Google para maior consistência e rapidez de carregamento.
- **Cadastro de Medicamentos**: Modal dialog acessível (`<dialog>`) com foco controlado para navegação por teclado (`Tab`).
- **Integração com Supabase (PostgreSQL)**: Gravação, leitura e remoção em tempo real diretamente no banco de dados.

---

## 🛠️ Tecnologias Utilizadas

- **Estruturação**: HTML5 Semântico
- **Estilização**: Vanilla CSS3 (baseado em Design Tokens e variáveis customizadas)
- **Ícones**: Google Material Icons
- **Comportamento**: JavaScript Vanilla (ES6+)
- **Banco de Dados & Backend**: Supabase Client API

---

## 📁 Estrutura de Arquivos

```bash
├── index.html     # Estrutura principal da página e modal de cadastro
├── style.css      # Design System, estilização geral e acessibilidade visual
├── app.js         # Lógica de controle do modal e integração com o Supabase
└── README.md      # Documentação do projeto
```

---

## ⚙️ Configuração e Inicialização

### 1. Requisitos Prontos no HTML

O arquivo `index.html` já inclui a CDN do cliente do Supabase e a biblioteca de fontes do Google Icons:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### 2. Estrutura do Banco de Dados (Supabase)

Para que o sistema funcione corretamente com a sua tabela, certifique-se de que a tabela no Supabase tenha o nome `medData` com as seguintes colunas:

| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | int8 / uuid | Chave primária autogerada |
| `medName` | text | Nome do medicamento |
| `medDosage`| text | Dosagem exata do remédio |
| `period` | text | Período do dia (`manha`, `tarde`, `tardenoite`, `noite`) |
| `color` | text | Cor da pílula (`red`, `blue`, `yellow`, `green`) |
