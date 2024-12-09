export const configuracoesCena = {
    "1.jpg": {
        setas: [
            {
                id: "seta-1",
                position: "-12.713 -3.076 0.000",
                rotation: "-13.815 -60.468 -14.16",
                destino: "../public/images/2.jpg",
            },
        ],
        box: null, // Sem box nesta cena
    },
    "2.jpg": {
        setas: [
            {
                id: "seta-1",
                position: "-0.768 -1.500 -11.638",
                rotation: "-15.98 -178.7 -6.24",
                destino: "../public/images/3.jpg",
            },
            {
                id: "seta-2",
                position: "8.000 2.000 -10.000",
                rotation: "0 -30 0",
                destino: "../public/images/4.jpg",
            },
        ],
        box: {
            position: "2 1.5 -3",
            color: "#00FF00", // Configuração dinâmica da box
        },
    },
    "3.jpg": {
        setas: [
            {
                id: "seta-1",
                position: "-11.235 -3.088 8.827",
                rotation: "-15.46 -2.143 -17.59",
                destino: "../public/images/4.jpg",
            },
        ],
        box: {
            position: "-1 2 -4",
            color: "#FF0000", // Outra cor dinâmica
        },
    },
    "4.jpg": {
        setas: [
            {
                id: "seta-1",
                position: "-5.999 -3.232 14.291",
                rotation: "-7.824 13.580 -4.802",
                destino: "../public/images/4.jpg",
            },
        ],
        box: {
            position: "-1 2 -4",
            color: "#FF0000", // Outra cor dinâmica
        },
    },
};