# 📸 Reactgram Frontend

Frontend do **Reactgram**, uma rede social fictícia construída com **React + Vite**. O projeto permite aos usuários interagirem com fotos, perfis e comentários de forma simples e intuitiva.

🔗 **Deploy:** [https://react-gram-rouge.vercel.app](https://react-gram-rouge.vercel.app)

---

## 🧠 Funcionalidades

Este frontend se conecta à [API do backend](https://github.com/Vinicius-b-oliveira/ReactGram_Backend) e oferece as seguintes funcionalidades:

- 🔐 **Autenticação:** Registro e login de usuários com persistência de sessão.
- 🏠 **Home pública:** Visualização de todas as fotos postadas por qualquer usuário.
- 👤 **Página de perfil:** Visualização do perfil do usuário com suas fotos publicadas.
- ✏️ **Edição de perfil:** Atualização do nome, biografia, imagem de perfil e senha.
- 📸 **Publicação de fotos:** Upload de imagens com título
- 🔍 **Busca de fotos:** Pesquisa dinâmica de fotos por título.
- 🧭 **Navegação SPA:** Transição fluida entre páginas via React Router.

---

## 🚧 Em desenvolvimento

O projeto está em fase de melhorias com foco em:

- 📱 **Responsividade:** Suporte completo para dispositivos móveis.
- ⚡ **Otimizações:** Melhor desempenho em produção (lazy loading, compressão de imagens, etc).

---

## 🛠️ Tecnologias e Ferramentas

- **[React](https://reactjs.org/)** – Biblioteca para construção de interfaces
- **[Vite](https://vitejs.dev/)** – Build tool moderno e rápido
- **[Redux Toolkit](https://redux-toolkit.js.org/)** – Gerenciamento de estado global
- **[React Router DOM](https://reactrouter.com/)** – Roteamento SPA
- **[Yup](https://github.com/jquense/yup)** – Validação de formulários
- **[Sass](https://sass-lang.com/)** – Pré-processador CSS
- **[ESLint](https://eslint.org/)** – Linter de código
- **[Prettier](https://prettier.io/)** – Formatador automático de código
- **[Vercel](https://vercel.com/)** – Hospedagem e deploy contínuo gratuito

---

## 📁 Estrutura de Pastas

```
reactgram/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ ├── routes/
│ ├── scss/
│ ├── services/
│ ├── slices/
│ ├── utils/
│ ├── App.jsx
│ ├── App.scss
│ ├── index.scss
│ ├── main.jsx
│ └── store.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── vercel.json
```
