import { mudarCena } from "./cena.js";
import { configuracoesCena } from "./config.js"

export function atualizarSetas(imagem) {
    console.log(`Atualizando setas para a imagem: ${imagem}`);
    const cena = document.querySelector("a-scene");
    const nomeImagem = imagem.split("/").pop();
    const configuracoes = configuracoesCena[nomeImagem]?.setas;

    if (!configuracoes) {
        console.warn(`Nenhuma seta configurada para: ${nomeImagem}`);
        return;
    }

    console.log(`Configurações encontradas para setas:`, configuracoes);

    // Remove setas existentes
    document.querySelectorAll(".seta").forEach((seta) => seta.remove());

    // Adiciona as novas setas
    configuracoes.forEach((config) => {
        const novaSeta = document.createElement("a-entity");
        novaSeta.setAttribute("id", config.id);
        novaSeta.setAttribute("class", "seta clickable");
        novaSeta.setAttribute("gltf-model", "../public/models/Arrow.glb");
        novaSeta.setAttribute("position", config.position);
        novaSeta.setAttribute("rotation", config.rotation);

        // Adicionar evento de clique para mudar de cena
        novaSeta.addEventListener("click", () => {
            console.log(`Seta clicada! Destino: ${config.destino}`);
            mudarCena(config.destino);
        });

        // Adicionar efeito de hover (mouseenter e mouseleave)
        novaSeta.addEventListener("mouseenter", () => {
            const mesh = novaSeta.getObject3D("mesh");
            if (mesh) {
                mesh.traverse((node) => {
                    if (node.isMesh) {
                        node.material.emissive = new THREE.Color(0x1e90ff); // Cor amarela
                        node.material.emissiveIntensity = 1; // Intensidade do brilho
                    }
                });
            }
            novaSeta.setAttribute("scale", "1.2 1.2 1.2"); // Aumenta o tamanho
        });

        novaSeta.addEventListener("mouseleave", () => {
            const mesh = novaSeta.getObject3D("mesh");
            if (mesh) {
                mesh.traverse((node) => {
                    if (node.isMesh) {
                        node.material.emissive = new THREE.Color(0x000000); // Sem brilho
                        node.material.emissiveIntensity = 0; // Restaura a intensidade
                    }
                });
            }
            novaSeta.setAttribute("scale", "1 1 1"); // Restaura o tamanho original
        });

        // Adiciona a seta na cena
        cena.appendChild(novaSeta);
    });
}
