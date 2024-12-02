---
title: Introdução
sidebar_position: 1
slug: /
---

# Guia Virtual da Faculdade

## Visão Geral do Projeto

Este projeto visa criar um **guia virtual interativo em 3D** para nossa faculdade, oferecendo uma experiência imersiva e informativa. Os visitantes poderão explorar o campus virtualmente, visualizar informações de parceiros e projetos desenvolvidos, e acessar funcionalidades de acessibilidade, como tradução para Libras e áudio descritivo.

---

## Objetivos

1. **Exploração em 3D**: Visualização imersiva do campus em formato tridimensional.  
2. **Informações Enriquecidas**: Adicionar detalhes sobre parceiros e projetos desenvolvidos pela faculdade.  
3. **Acessibilidade Inclusiva**:  
   - Áudio descritivo para navegação no ambiente 3D.  
   - Tradução para Libras com avatar virtual (Hand Talk).
   - [Exemplo de integração do Hand Talk](https://docs.handtalk.me/br/11/introducao#sobre-o-tradutor-de-texto).

---

## Ferramentas e Tecnologias

### **Desenvolvimento 3D**
Para criar um ambiente 3D interativo e fluido, sugerimos as seguintes ferramentas:

1. **Engine 3D**:  
   - **[Three.js](https://threejs.org/)**: Biblioteca JavaScript para criar, renderizar e manipular gráficos 3D na web.  
     **Motivos**: Simplicidade, compatibilidade com navegadores e ampla comunidade.  
   - **[Unity 3D](https://unity.com/)**: Ferramenta poderosa para desenvolver experiências interativas em 3D.  
     **Motivos**: Suporte para WebGL, ideal para projetos robustos com maior interação.

2. **Modelagem 3D**:  
   - **[Blender](https://www.blender.org/)**: Software gratuito e open-source para criar e editar modelos 3D.  
   - **SketchUp**: Alternativa intuitiva para modelagem arquitetônica.

3. **Renderização Web**:  
   - **WebGL**: API para renderização de gráficos 2D e 3D diretamente no navegador.  
   - **Babylon.js**: Alternativa ao Three.js com ferramentas avançadas de manipulação 3D.

---

### **Backend e Integração**
- **Backend**:  
  - Framework: [Node.js](https://nodejs.org/) com [Express.js](https://expressjs.com/).  
    Motivos: Escalabilidade, performance e integração com Three.js.  
  - Banco de Dados:  
    - **MongoDB**: Para armazenar modelos, informações de parceiros e projetos.  
    - **Firebase Realtime Database**: Alternativa para sincronização em tempo real.

---

### **Acessibilidade**
1. **Áudio Descritivo**:  
   - Utilizar [Amazon Polly](https://aws.amazon.com/polly/) para gerar narração automática das informações do guia.  
     **Exemplo de implementação**:
     ```javascript
     const synth = window.speechSynthesis;
     const description = "Bem-vindo ao campus virtual. Explore os espaços interativos.";
     const utterance = new SpeechSynthesisUtterance(description);
     synth.speak(utterance);
     ```

2. **Libras (Hand Talk)**:  
   - Ferramenta: [Hand Talk](https://www.handtalk.me/).  
   - [Exemplo de integração do Hand Talk](https://docs.handtalk.me/br/11/introducao#sobre-o-tradutor-de-texto).
   - Integração:
     1. Registrar-se na plataforma.  
     2. Inserir o script no código do projeto.  
     **Código básico**:
     ```html
     <script src="https://plugin.handtalk.me/script/handtalk.min.js"></script>
     <script>
       var ht = new HT({
         token: "SEU_TOKEN_DE_ACESSO",
         language: "pt"
       });
     </script>
     ```

---

## Fluxo do Projeto

1. **Modelagem 3D**:
   - Capturar imagens do campus utilizando drones e câmeras 360º.  
   - Desenvolver modelos 3D no Blender ou SketchUp.  
   - Exportar modelos no formato `.glb` ou `.gltf` para integração no ambiente web.  

2. **Desenvolvimento do Ambiente**:
   - Criar o ambiente interativo em **Three.js** ou **Babylon.js**.  
   - Adicionar funcionalidades como navegação, zoom e exibição de informações sobre os locais.

3. **Acessibilidade e Tradução**:
   - Configurar áudio descritivo e tradução para Libras.  
   - Testar a usabilidade em diferentes dispositivos.

4. **Deploy**:
   - Hospedagem: [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/) ou [AWS S3](https://aws.amazon.com/s3/).  
   - Configurar pipelines CI/CD com [GitHub Actions](https://github.com/features/actions).

---

## Estrutura do Projeto

```bash
/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── 3d/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   ├── models/
│   └── routes/
└── database/
    ├── schema.json
    └── migrations/
```

---

## Exemplo de Implementação com Three.js

### **Renderização de um Modelo 3D**
```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionando um cubo como placeholder
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

### **Integração do Modelo 3D**
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load(
  'path/to/model.glb',
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
```

---

## Apresentação do Projeto

- **[Acesse a Apresentação no Canva](https://www.canva.com/design/DAGXNcwt1FU/u_sYmlVXmWBW-XyducoWWQ/edit)**  
---

## Próximos Passos

1. Finalizar a captura e modelagem 3D do campus.
2. Desenvolver o protótipo interativo com Three.js.
3. Implementar acessibilidade com áudio descritivo e Hand Talk.
4. Realizar o deploy e obter feedback para melhorias.