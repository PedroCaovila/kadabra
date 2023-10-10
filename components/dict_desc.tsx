import * as fs from 'fs';

interface DadosHabilidade {
    chave: string;
    descricao: string;
}

const dadosJSON: DadosHabilidade[] = JSON.parse(fs.readFileSync('desc.json', 'utf8'));

const dict_description: { [chave: string]: string } = {};

dadosJSON.forEach(habilidade => {
    dict_description[habilidade.chave] = habilidade.descricao;
});

// Exemplo de uso
const descricaoEF01CI01: string | undefined = dict_description['EF01CI01'];

if (descricaoEF01CI01) {
    console.log(descricaoEF01CI01);
} else {
    console.log('Habilidade não encontrada.');
}
