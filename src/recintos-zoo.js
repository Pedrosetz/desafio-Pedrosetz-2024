export { RecintosZoo as RecintosZoo };

const recintos = [
    { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
    { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
    { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] }
];

const especies = {
    "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
    "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
    "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
    "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
    "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
    "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
};

class RecintosZoo {
    analiseRecintos(animal, quantidade) {
        if (!especies[animal]) {
            return { erro: "Animal inválido" };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animalInformacao = especies[animal];
        const recintosViaveis = [];

        for (const recinto of recintos) {
            //verifica se o bioma é o certo para o animal // se não for vai ser ignorado
            if (!animalInformacao.biomas.includes(recinto.bioma) && !(animalInformacao.biomas.includes("savana") && recinto.bioma === "savana e rio")) {
                continue;
            }

            //verifica se já tem algum animal carnivoro no recinto // se ouver ele vai ser ignorado
            const Carnivoro = animalInformacao.carnivoro;
            if (Carnivoro && recinto.animaisExistentes.length > 0 && recinto.animaisExistentes.some(a => a.especie !== animal)) {
                continue;
            }

            //calcula o espaco total ocupado no recinto contando os animais presentes
            const espacoOcupado = recinto.animaisExistentes.reduce((total, animal) => total + (especies[animal.especie].tamanho * animal.quantidade), 0);
            //calcula o espaco necessario para os novos animais contando os animais presentes
            const espacoNecessario = (animalInformacao.tamanho * quantidade) + (recinto.animaisExistentes.length > 0 ? 1 : 0);


            //verifica se o recinto tem espaco suficiente para novos animais, se tiver adiciona aos recintos viaveis
            if (espacoNecessario + espacoOcupado <= recinto.tamanhoTotal) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - espacoOcupado - espacoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

const zoo = new RecintosZoo();
const resultado = zoo.analiseRecintos("MACACO", );
console.log(resultado);