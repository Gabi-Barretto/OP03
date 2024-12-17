---
title: Desenvolvimento
sidebar_position: 4
id: semana-4
---

### **Semana 4 🚀**  

---

### **Melhorias no Frontend e Backend**

#### **1. Visão Geral da Semana**

Na quarta semana, consolidamos as melhorias na experiência do usuário no **frontend** e otimizamos o **backend** para maior eficiência no gerenciamento e carregamento de imagens.  

**Destaques da Semana:**
1. **Frontend:**
   - **Redesign do Modal**: Interface aprimorada, com links dinâmicos e imagens configuráveis.
   - **Sistema de Áudio e Narração**: Trilha sonora ajustável e narração sincronizada com a navegação.
   - **Interatividade Avançada**: Melhoria na navegação por setas e boxes dinâmicas.
   - **Aprimoramento de Imagens**: Suporte expandido para capturar e exibir mais imagens.

2. **Backend:**
   - **Download Automático de Imagens**: Implementação de sincronização local automática, garantindo transições mais fluidas.
   - **Armazenamento Otimizado com Supabase S3**: Upload e sincronização de imagens diretamente na inicialização do servidor.

---

### **2. Atualizações no Frontend**

#### **2.1. Modal e Interatividade**
- **Imagens e Links Dinâmicos:**
  - Cada modal pode exibir até 8 imagens, cada uma associada a um link configurado em `config.js`. As imagens são carregadas dinamicamente e exibidas no modal.
- **Lógica Aprimorada:**
  - O modal é exibido com base nas interações do usuário e pode redirecionar para URLs externas, aumentando a usabilidade e interatividade.

#### **2.2. Sistema de Áudio e Narração**
- **Áudio Configurável:**
  - Três trilhas sonoras disponíveis: Jazz, Eletrônica e Rock, alternadas dinamicamente através de botões clicáveis no ambiente.
- **Narração Interativa:**
  - Áudios de narração sincronizados com as cenas. Os usuários podem ativar ou desativar o narrador conforme necessário.

#### **2.3. Navegação Avançada**
- **Setas Dinâmicas:**
  - Navegação entre cenas aprimorada com setas configuráveis diretamente em `config.js`. Cada seta possui destino específico e facilita a transição.
- **Boxes Configuráveis:**
  - Boxes dinâmicas associadas a cada cena, com dados detalhados no modal ao serem clicadas.

---

### **3. Atualizações no Backend**

#### **3.1. Sincronização de Imagens**
- **Sincronização Local Automática:**
  - Durante a inicialização do servidor, imagens são sincronizadas entre o Supabase S3 e o diretório local, eliminando gargalos de carregamento. Imagens ausentes localmente são automaticamente baixadas.
- **Benefícios:**
  - Maior fluidez na transição entre cenas no frontend.
  - Redução de latência durante a navegação.

#### **3.2. Estrutura Modular**
- **Configuração do Supabase S3:**
  - Arquivo `s3Config.js` gerencia a conexão com o Supabase, utilizando credenciais armazenadas em variáveis de ambiente.
- **Lógica de Upload e Download:**
  - Arquivo `s3Service.js` centraliza as operações de upload, download e sincronização de imagens.

---

### **4. Estrutura Atualizada do Backend**

#### **4.1. Fluxo de Sincronização**
1. **Inicialização do Servidor (`server.js`)**:
   - Configurações carregadas via `.env`.
   - Sincronização automática executada na inicialização.

2. **Sincronização Local (`syncLocalImagesWithSupabase`):**
   - Verifica se as imagens presentes no Supabase S3 já estão disponíveis localmente. Caso contrário, faz o download das imagens faltantes.

#### **4.2. Código Atualizado**

**Exemplo de Lógica no `s3Service.js`:**
```javascript
const syncLocalImagesWithSupabase = async (bucket) => {
  const localDir = path.resolve(__dirname, '../../public/images');
  const remoteImages = await fetchImagesFromS3(bucket);
  const localImages = fs.readdirSync(localDir).filter(file => fs.statSync(path.join(localDir, file)).isFile());

  const missingImages = remoteImages
    .map(img => img.name)
    .filter(fileName => !localImages.includes(fileName));

  for (const fileName of missingImages) {
    await downloadFromSupabaseS3(bucket, fileName, localDir);
  }
};
```.

**Upload para o Supabase:**
```javascript
const uploadToSupabaseS3 = async (bucket, fileName, filePath) => {
  const params = {
    Bucket: bucket,
    Key: fileName,
    Body: fs.createReadStream(filePath),
    ContentType: getFallbackMimeType(fileName),
  };

  await s3Client.send(new PutObjectCommand(params));
};
```

---

### **5. Benefícios Consolidativos**

#### **Frontend:**
- Experiência de usuário mais rica, com áudio, narração e navegação integrados.
- Boxes e setas dinâmicas tornam a interface mais responsiva e adaptada ao conteúdo.

#### **Backend:**
- Sincronização eficiente de imagens, reduzindo latência.
- Estrutura modular e escalável, facilitando manutenção e futuras expansões.

---

### **6. Próximos Passos**

1. **Frontend:**
   - Adicionar indicadores visuais para setas e boxes clicáveis.
   - Implementar notificações para erros no carregamento de áudio ou modal.

2. **Backend:**
   - Melhorar a autenticação para controle de acesso às imagens.
   - Configurar logs detalhados para monitorar uploads e sincronizações.
