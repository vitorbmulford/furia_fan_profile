# 🦁 FURIA Fan Profiler

Plataforma interativa para **reconhecimento e engajamento de fãs da FURIA** com uso de tecnologias modernas, inteligência artificial e integração com redes sociais.

## 🚀 Sobre o Projeto

O **FURIA Fan Profiler** é uma aplicação web que coleta, valida e analisa dados de torcedores da FURIA, criando perfis ricos e interativos com base em documentos, engajamento online e preferências pessoais.

Por meio de IA e integrações inteligentes, conseguimos determinar o nível de fanatismo dos usuários, promovendo uma experiência única e personalizada.

---

## 🧠 Funcionalidades Principais

### 📋 Coleta & Validação de Dados

Formulários inteligentes com validação client/server e armazenamento seguro.

- Nome, CPF, endereço, interesses
- Eventos e produtos relacionados à FURIA
- Autenticação via Firebase
- Armazenamento em JSON Server

---

### 📎 Upload de Documentos com IA

Documentos são processados e analisados para garantir a autenticidade e extrair dados automaticamente.

- Suporte a imagens e PDFs (RG, CNH, comprovantes)
- Upload seguro com Cloudinary
- OCR com `tesseract.js`
- Extração de dados via IA

---

🔗 Engajamento Social & Análise de Perfil

A análise da presença e envolvimento do fã no universo competitivo e nas redes sociais é feita com Cheerio, uma biblioteca de scraping em Node.js. Em vez de usar IA, o sistema coleta e interpreta dados diretamente de:

    Perfis em Twitter, Instagram e outras plataformas

    Postagens relacionadas a eSports

    Perfis públicos como HLTV, Faceit e Liquipedia

Essas informações são usadas para classificar automaticamente o nível de engajamento do fã com base em critérios definidos, como frequência de interações e presença em plataformas competitivas.


---

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **Framer Motion** (animações)
- **Firebase Auth** (autenticação)
- **JSON Server** (armazenamento local)
- **Cloudinary** (upload de arquivos)
- **Tesseract.js** (OCR via JavaScript)
- **Tailwind CSS** (estilização)
- **React Icons personalizados**

---

## 🎯 Objetivo

Criar uma fan experience de outro nível, onde o envolvimento real com o time possa ser medido, reconhecido e recompensado.

A ideia é aproximar ainda mais a comunidade da FURIA usando **tecnologia de ponta**, **automação inteligente** e **estética gamer competitiva**.

### 1. Clone o repositório

```bash
## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/vitorbmulford/furia_fan_profile
2. Instale as dependências

Certifique-se de ter o Node.js instalado.

npm install

3. Configure as variáveis de ambiente

Para rodar o projeto, você precisará obter algumas chaves de API. Siga os passos abaixo para configurar seu arquivo .env.
🔐 Chave do NextAuth

Gere um segredo com o comando:

npx auth secret

Adicione ao seu .env:

AUTH_SECRET=your_nextauth_secret

🔑 Chaves do Google

    Acesse o Google Cloud Console

    Crie um projeto e vá em APIs e serviços → Credenciais

    Crie um ID do Cliente OAuth 2.0

    Use esta URI de redirecionamento:

    http://localhost:3000/api/auth/callback/google

    Copie o Client ID e Client Secret e adicione ao seu .env:

AUTH_GOOGLE_ID=your_google_client_id  
AUTH_GOOGLE_SECRET=your_google_client_secret

🐦 Chaves do Twitter

    Acesse o Twitter Developer Portal

    Crie um App e habilite OAuth 2.0

    Use esta URI de callback:

    http://localhost:3000/api/auth/callback/twitter

    Copie as credenciais e adicione ao seu .env:

TWITTER_CLIENT_ID=your_twitter_client_id  
TWITTER_CLIENT_SECRET=your_twitter_client_secret

☁️ Chaves do Cloudinary

    Crie uma conta em Cloudinary

    No Dashboard, copie as seguintes informações:

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name  
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret  
CLOUDINARY_URL=your_cloudinary_url

    💡 Dica: O CLOUDINARY_URL geralmente é fornecido automaticamente no formato:
    cloudinary://API_KEY:API_SECRET@CLOUD_NAME

📁 Exemplo de .env

AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=

4. Inicie o servidor

npm run dev

Acesse o projeto em: http://localhost:3000

## 🧪 Exemplos de Uso para Testar

Aqui estão alguns exemplos para testar o funcionamento do formulário de criação de perfil de fã da FURIA:

### ✅ Exemplo 1 — Cadastro Válido

- **Nome Completo:** Ana Carolina Souza  
- **CPF:** 123.456.789-09 *(válido fictício)*  
- **Endereço:** Rua das Palmeiras, 123 - São Paulo, SP  
- **Interesses:** CS:GO, Valorant, LoL  
- **Links de Redes Sociais:**  
  `https://instagram.com/anacarolina`, `https://twitter.com/anacarolfps`  
- **Documento de Identificação:**  
  Documento com o nome "Ana Carolina Souza" claramente legível (formato JPG/PNG)

> 💡 **Importante:** O nome informado deve estar visível no documento enviado. Certifique-se de que o arquivo está legível para que o OCR funcione corretamente.

### ⚠️ Exemplo 2 — CPF Inválido

- **CPF:** 111.111.111-11  
- Resultado: ❌ O sistema exibirá um erro de CPF inválido.

### ⚠️ Exemplo 3 — Documento sem Nome Compatível

- **Nome Informado:** João da Silva  
- **Documento:** Imagem contendo o nome "Carlos Eduardo"  
- Resultado: ❌ O sistema alertará que o nome não bate com o documento.

### ⚠️ Exemplo 4 — Campos Obrigatórios Vazios

- Deixe qualquer campo como CPF, nome ou documento vazio.  
- Resultado: ❌ O sistema impedirá o envio e solicitará o preenchimento correto.

## 📁 Estrutura do Projeto

Abaixo está a organização de diretórios e arquivos principais do projeto, com uma breve descrição de suas responsabilidades:

src/
├── app/
│ ├── actions/
│ │ └── handle-auth.ts # Manipulação de autenticação personalizada
│ ├── api/ # Endpoints da API (ex: criação de perfis de fãs)
│ ├── auth/ # Configurações de autenticação (NextAuth)
│ ├── [...nextauth]/
│ │ └── route.ts # Rota do NextAuth para autenticação de usuários
│ ├── components/ # Componentes reutilizáveis da interface
│ │ ├── data.tsx # Dados ou conteúdo dinâmico da UI
│ │ ├── deployment.tsx # Seção de deployment da UI
│ │ ├── footer.tsx # Rodapé do site
│ │ ├── header.tsx # Cabeçalho do site
│ │ ├── hero.tsx # Seção hero da landing page
│ │ ├── icons.tsx # Ícones customizados usados no projeto
│ │ ├── info.tsx # Seção de informações
│ │ └── stats.tsx # Estatísticas exibidas na UI
│ ├── fans/ # Funcionalidades relacionadas a usuários/fãs (ex: criação de perfil)
│ ├── upload/ # Lógica de upload de arquivos (documentos de identificação)
│ ├── home/ # Página inicial e sua estrutura
│ ├── pages/ # Outras páginas auxiliares do projeto
│  └── form/ # Formulários de entrada de dados (ex: formulário de perfil de fã)
│  └── profile/ # Página de perfil do usuário
│ ├── favicon.ico # Ícone da aba do navegador
│ ├── globals.css # Estilos globais do projeto
│ ├── layout.tsx # Layout principal aplicado a todas as páginas
│ ├── page.module.css # Estilização específica da página principal
│ └── page.tsx # Página principal do projeto
├── lib/
│ ├── auth.ts # Utilitários e helpers para autenticação
│ └── utils.ts # Funções utilitárias gerais usadas pelo projeto


> ✅ Essa organização permite escalar facilmente as funcionalidades, separando bem lógica de negócios, autenticação, componentes visuais e formulários.






