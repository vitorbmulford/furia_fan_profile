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
git clone https://github.com/vitorbmulford/furia_fan_profile

2. Instale as dependências

Certifique-se de ter o Node.js instalado na sua máquina.

Sempre exibir os detalhes

npm install

3. Configurar as chaves de API

Para rodar o projeto, você precisará obter algumas chaves e configurar as variáveis de ambiente. Siga os passos abaixo:

Chaves do Google (AUTH_GOOGLE_ID e AUTH_GOOGLE_SECRET):

  Acesse o Google Cloud Console.

  Crie um projeto e vá em APIs e serviços → Credenciais.

  Crie um ID do Cliente OAuth e copie o ID do Cliente e o Segredo do Cliente.

  Adicione essas chaves no seu .env:

  AUTH_GOOGLE_ID=your_google_client_id
  AUTH_GOOGLE_SECRET=your_google_client_secret

Chave do NextAuth (AUTH_SECRET):

  npx auth secret
  
  Adicione no seu .env:
  
  AUTH_SECRET=your_nextauth_secret


Exemplo do .env:
  
AUTH_SECRET
Gere um segredo aleatório (por exemplo, com openssl rand -base64 32 ou use um gerador online).

AUTH_GOOGLE_ID & AUTH_GOOGLE_SECRET

    Acesse Google Cloud Console

    Crie um projeto > OAuth 2.0 Client IDs

    Configure a URI de redirecionamento: http://localhost:3000/api/auth/callback/google

    Copie o Client ID e Secret.

TWITTER_CLIENT_ID & TWITTER_CLIENT_SECRET

    Vá para Twitter Developer Portal

    Crie um App e habilite OAuth 2.0

    Use http://localhost:3000/api/auth/callback/twitter como URI de callback.

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_URL

    Crie uma conta em Cloudinary

    Vá em Dashboard e copie o Cloud name, API Key, API Secret e Cloudinary URL.

4. Inicie o servidor

Sempre exibir os detalhes

npm run dev

O projeto estará disponível em http://localhost:3000.




