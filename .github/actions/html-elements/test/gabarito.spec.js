const jsdom = require('jsdom');
const fs = require('fs');

let $ = undefined;
let FILES_PATH = process.env.FILES_PATH;
beforeAll(() => {
    let questionFile = 'gabarito.html';
    let html = fs.readFileSync(FILES_PATH + '/' + questionFile);
    let dom = new jsdom.JSDOM(html);
    $ = require('jquery')(dom.window);
});

describe('T3: Prova de Múltipla Escolha - Respostas', () => {

    it('deve ter criado o arquivo gabarito.html', () => {
        expect($).toBeDefined();

        let htmlTag = $('html')[0].textContent;
        let headTag = $('head')[0].textContent;
        let bodyTag = $('body')[0].textContent;
        expect(htmlTag).toBeTruthy();
        expect(headTag).toBeTruthy();
        expect(bodyTag).toBeTruthy();
    });

    it('deve ter uma tabela', () => {
        let tableTag = $('table');

        expect(tableTag).toHaveLength(1);
    });

    it('deve possuir cinco linhas na tabela', () => {
        let trTags = $('table tr');
        expect(trTags).toHaveLength(5);
    });

    it('deve possuir duas colunas por linha', () => {
        let trTags = $('table tr');
        
        for (const trTag of trTags) {
            let tdTags = $(trTag).find('td');
            expect(tdTags).toHaveLength(2);

            for (const tdTag of tdTags) {
                expect(tdTag.textContent).toBeTruthy();
            }
        }
    });
});