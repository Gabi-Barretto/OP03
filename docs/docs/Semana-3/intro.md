---
title: Desenvolvimento
sidebar_position: 3

---

# Integração, Otimização e Automação do Backend - Semana 3

## Visão Geral da Semana

Na terceira semana do projeto, focamos em **automatizar o processo de upload de imagens para o Supabase**, integrando diretamente no backend. Além disso, estabelecemos rotas claras para listar e acessar individualmente as imagens, preparando a base para futuras melhorias no frontend e no design da experiência do usuário. Buscamos também **otimizar e automatizar todo o backend**, proporcionando um fluxo mais inteligente e escalável de gerenciamento de recursos visuais. Isso incluiu:

1. **Automatizar a Integração com o Armazenamento Externo (Supabase)**:  
   Permitindo que as imagens sejam carregadas a partir de um banco externo (S3 compatível do Supabase), melhorando o processamento e o desempenho geral da aplicação.

2. **Modularizar o Backend**:  
   Reorganizamos a arquitetura do servidor para que cada responsabilidade (upload, fetch, rotas, lógica de negócio, configuração) esteja bem definida em seus respectivos módulos, tornando o código mais fácil de manter, testar e escalar.

3. **Aprimorar o Fluxo de Sincronização das Imagens**:  
   Ao iniciar o servidor, o backend agora verifica automaticamente o diretório local de imagens e as sincroniza com o armazenamento externo. Assim, garantimos que o ambiente virtual tenha sempre as imagens mais atualizadas.

No final desta etapa, contamos com um backend mais robusto, modularizado e preparado para lidar com grandes quantidades de imagens com menor esforço operacional. Além disso, esta conquista abre caminho para integrações no frontend, otimizações de design e funcionalidades mais ricas, consolidando a base do guia virtual em 3D da nossa faculdade.

---

## Objetivos

Os objetivos dessa terceira semana foram focados tanto na automação do upload de imagens quanto na otimização e modularização do backend para escalabilidade futura:

1. **Automação de Upload de Imagens**:  
   Ao inicializar o servidor, todas as imagens presentes em um diretório local são enviadas automaticamente para o armazenamento do Supabase, dispensando o upload manual de cada imagem.

2. **Rotas para Acesso às Imagens**:  
   Disponibilizar endpoints REST para listar todas as imagens e acessar uma imagem específica pelo nome, facilitando a integração com o frontend e outros consumidores da API.

3. **Manutenibilidade e Escalabilidade**:  
   Garantir uma arquitetura modular, com separação clara entre camadas (configuração, serviços, controladores, rotas e utilitários), tornando simples a manutenção e evolução do sistema. Reorganizar a arquitetura do servidor para manter cada responsabilidade em seu módulo, facilitando testes, manutenção e expansão futura.

4. **Preparo para o Futuro e Integração com o Frontend**:  
   Criar um ambiente propício para integração com o frontend e melhorias no design, tornando mais simples a adição de novas funcionalidades, ajustes visuais e integrações com ferramentas de acessibilidade.  
   Estabelecer uma base sólida que permita a fácil exibição das imagens no ambiente 3D, bem como a implementação de design de experiência do usuário mais refinados.

5. **Melhoria do Processamento e Desempenho**:  
   Ao utilizar o Supabase (S3 compatível) para armazenamento das imagens, o backend se torna mais leve, focando na lógica de negócio, enquanto a entrega de conteúdo estático é delegada ao serviço externo, possivelmente melhorando o desempenho e a escalabilidade.

---

## Estrutura do Backend na Semana 3

Mantivemos a organização modular implementada anteriormente, incorporando agora as novas funcionalidades de upload, rotas e fluxos otimizados. Abaixo, a estrutura atualizada do backend:

```bash
src/
└── projeto/
    └── backend/
        ├── config/
        │   ├── dbConfig.js
        │   └── s3Config.js
        ├── controllers/
        │   └── imageController.js
        ├── models/
        │   └── imageModel.js
        ├── routes/
        │   └── imageRoutes.js
        ├── services/
        │   ├── s3Service.js
        │   └── supabaseService.js
        ├── utils/
        │   ├── mimeUtil.js
        │   └── progressUtil.js
        ├── .env
        └── server.js
```

**Pontos-chave**:  
- **`services/s3Service.js`**: Lógica de upload e obtenção de imagens do Supabase (S3).  
- **`controllers/imageController.js`**: Coordena a sincronização e a busca de imagens, chamando os serviços adequados.  
- **`routes/imageRoutes.js`**: Define endpoints `/images` e `/images/:imageName` para acesso público às imagens.  
- **`utils/`**: Funções auxiliares para manipulação de MIME types, barra de progresso e outras utilidades.  
- **`config/`**: Configurações do servidor, incluindo variáveis de ambiente, acesso ao Supabase e integração com outras dependências.

Essa arquitetura modular e otimizada facilita futuras expansões, troca de fornecedores de armazenamento, adição de novas rotas e manutenção do código.

---

## Fluxo de Trabalho do Upload Automatizado e Sincronização

1. **Inicialização do Servidor (`server.js`)**:  
   Ao iniciar, o servidor carrega as variáveis de ambiente, configura o Express (CORS, JSON parsing) e registra as rotas. Em seguida, chama a função `syncImages()` do `imageController` para iniciar o processo de sincronização das imagens.

   **Exemplo de trecho do `server.js`**:  
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const dotenv = require('dotenv');
   const imageRoutes = require('./routes/imageRoutes');
   const { syncImages } = require('./controllers/imageController');

   dotenv.config({ path: '.env' });

   const app = express();
   app.use(cors());
   app.use(express.json());

   app.use('/api', imageRoutes);

   const PORT = process.env.PORT || 8080;
   app.listen(PORT, async () => {
     console.log(`Server running on port ${PORT}`);
     await syncImages();
   });
   ```

2. **Sincronização das Imagens (`imageController.js`)**:  
   A função `syncImages()` lê o diretório local de imagens (`public/images`) e envia cada arquivo para o Supabase, usando a função `uploadToSupabaseS3` do `s3Service.js`. Uma barra de progresso é exibida no console, auxiliando no monitoramento do processo.

   **Exemplo do `imageController.js`**:  
   ```javascript
   const { fetchImagesFromS3, uploadToSupabaseS3 } = require('../services/s3Service');
   const { createProgressBar } = require('../utils/progressUtil');
   const path = require('path');
   const fs = require('fs');

   console.log(`... (ASCII art omitida para brevidade) ...`);

   const syncImages = async () => {
     try {
       const imagesDir = path.join(__dirname, '../../public/images');
       const files = fs.readdirSync(imagesDir);

       console.log(`Scanning images folder...`);

       const progressBar = createProgressBar(files.length);

       for (const file of files) {
         const filePath = path.join(imagesDir, file);
         const fileStat = fs.statSync(filePath);

         if (fileStat.isFile()) {
           const bucket = process.env.SUPABASE_BUCKET;
           const result = await uploadToSupabaseS3(bucket, file, filePath);

           if (result) console.log(`Uploaded: ${file}`);
           else console.log(`Failed to upload: ${file}`);
         }

         progressBar.increment();
       }

       progressBar.stop();
       console.log('Image sync complete.');
     } catch (error) {
       console.error('Error syncing images:', error);
     }
   };

   const fetchImageByName = async (bucket, imageName) => {
     try {
       const images = await fetchImagesFromS3(bucket);
       const image = images.find((img) => img.name === imageName);

       if (!image) {
         throw new Error(`Image with name ${imageName} not found`);
       }

       return image;
     } catch (error) {
       console.error(`Error fetching image ${imageName}:`, error);
       throw new Error('Failed to fetch image');
     }
   };

   module.exports = { syncImages, fetchImagesFromS3, fetchImageByName };
   ```

3. **Upload para o Supabase (`s3Service.js`)**:  
   O `s3Service.js` gerencia a conexão com o Supabase, usando credenciais do `.env`, e executa o upload via `PutObjectCommand`. Além disso, possibilita buscar imagens já armazenadas.  
   Esse serviço é otimizado para lidar com grande quantidade de arquivos, garantindo que o backend não seja sobrecarregado. Assim, o backend concentra-se na lógica, enquanto o Supabase lida com a entrega eficiente do conteúdo estático.

---

## Rotas Disponíveis

As rotas foram configuradas no arquivo `imageRoutes.js`, garantindo acesso simplificado aos recursos:

**`imageRoutes.js`**:  
```javascript
const express = require('express');
const { fetchImagesFromS3, fetchImageByName } = require('../controllers/imageController');
const router = express.Router();

// Retorna todas as imagens
router.get('/images', async (req, res) => {
  try {
    const bucket = process.env.SUPABASE_BUCKET;
    const images = await fetchImagesFromS3(bucket);
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Retorna uma imagem específica por nome
router.get('/images/:imageName', async (req, res) => {
  const { imageName } = req.params;

  try {
    const bucket = process.env.SUPABASE_BUCKET;
    const image = await fetchImageByName(bucket, imageName);
    res.json(image);
  } catch (error) {
    console.error(`Error fetching image ${imageName}:`, error.message);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
```

### Listagem de Todas as Imagens

**`GET /api/images`**  
Retorna um array de objetos, cada objeto representando uma imagem disponível no Supabase, com `name` e `url`. Assim, o frontend ou outros serviços podem exibir as imagens de forma dinâmica.

**Exemplo de Resposta**:  
```json
[
  {
    "name": "1.jpg",
    "url": "https://.../Images/1.jpg?t=2024-12-06T12%3A05%3A40.993Z"
  },
  {
    "name": "2.jpg",
    "url": "https://.../Images/2.jpg"
  }
]
```

### Consulta de Uma Imagem Específica

**`GET /api/images/:imageName`**  
Acessa as informações de uma imagem específica pelo nome. Se encontrada, retorna um objeto com `name` e `url`. Caso contrário, retorna um status 404 com mensagem de erro.

**Exemplo de Resposta (Sucesso)**:  
```json
{
  "name": "1.jpg",
  "url": "https://.../Images/1.jpg?t=2024-12-06T12%3A05%3A40.993Z"
}
```

---

## Benefícios da Abordagem

- **Automação e Eficiência**:  
  Dispensa o upload manual de cada imagem. Ao iniciar o servidor, todas as novas imagens são enviadas ao Supabase automaticamente.

- **Escalabilidade Modular**:  
  A arquitetura, com serviços e controladores separados, facilita futuras expansões, troca de fornecedores de armazenamento ou adição de novas rotas.

- **Integração Simplificada com o Frontend**:  
  Endpoints claros (`/api/images` e `/api/images/:imageName`) tornam simples para o frontend carregar imagens de forma dinâmica e flexível.

- **Performance e Confiabilidade**:  
  Ao delegar o armazenamento de imagens ao Supabase, o backend pode focar na lógica de negócio. Isso melhora o desempenho, pois o Supabase é otimizado para entrega de conteúdo estático.

- **Redução de Custos de Manutenção**:  
  O código organizado por camadas diminui o tempo de manutenção. Ajustes em uma parte do código não afetam as outras, tornando o backend mais robusto e menos suscetível a erros.

<!-- ---

## Espaço para Mudanças Futuras

### Ajustes no Frontend  
À medida que avançamos, o frontend poderá:  
- Consumir as rotas `/api/images` para montar galerias.  
- Apresentar imagens específicas para contextos particulares do tour virtual.  
- Integrar a exibição de imagens com recursos de acessibilidade (descrições em áudio, avatar de Libras, etc.).

### Design e Experiência do Usuário  
Em etapas futuras, discutiremos:  
- Melhores práticas visuais para a exibição das imagens (thumbnails, carrosséis, zoom, etc.).  
- Usabilidade e navegação, oferecendo ao usuário final uma experiência intuitiva no tour virtual do campus.  
- Integração com outras mídias (vídeos, modelos 3D texturizados, etc.).

### Decisões de Design e UX  
- Como apresentar as imagens no UI do tour virtual?  
- Adicionar elementos de navegação intuitiva, zoom ou filtros por tipo de imagem.  
- Ajustar a paleta de cores, tipografia e layout para melhorar a experiência do usuário.

--- -->

## Próximos Passos

1. **Otimização do Upload**:  
   Implementar cache local, verificar se a imagem já existe no Supabase para evitar reenvios redundantes e melhorar a eficiência.

2. **Segurança e Autorização**:  
   Adicionar autenticação e controle de acesso a algumas rotas, caso seja necessário restringir o upload a usuários autenticados.

3. **Integração Contínua e Deploy Automatizado**:  
   Configurar pipelines de CI/CD para testes automatizados, garantindo qualidade e estabilidade contínua do backend.

---

