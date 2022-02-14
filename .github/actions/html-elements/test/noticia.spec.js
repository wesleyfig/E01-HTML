const jsdom = require('jsdom');
const fs = require('fs');

let $ = undefined;
let FILES_PATH = process.env.FILES_PATH;
beforeAll(() => {
    let questionFile = 'noticia.html';
    let html = fs.readFileSync(FILES_PATH + '/' + questionFile);
    let dom = new jsdom.JSDOM(html);
    $ = require('jquery')(dom.window);
});

describe('T1: Notícia do dia', () => {
    it('deve ter criado o arquivo noticia.html', () => {
        expect($).toBeDefined();

        let htmlTag = $('html')[0].textContent;
        let headTag = $('head')[0].textContent;
        let bodyTag = $('body')[0].textContent;
        expect(htmlTag.length).toBeGreaterThan(0);
        expect(headTag.length).toBeGreaterThan(0);
        expect(bodyTag.length).toBeGreaterThan(0);
    });
    it('deve possuir pelo menos um título', () => {
        let h1Tag = $('h1')[0];

        expect(h1Tag).toBeDefined();
        expect(h1Tag.textContent).toBeTruthy();
    });
    it('deve possuir pelo menos um subtítulo', () => {
        let h2Tag = $('h2')[0];

        expect(h2Tag).toBeDefined();
        expect(h2Tag.textContent).toBeTruthy();
    });
    it('deve possuir pelo menos quatro parágrafos', () => {
        let pTags = $('p');

        expect(pTags.length).toBeGreaterThan(3);
        for (const pTag of pTags) {
            expect(pTag.textContent).toBeTruthy();
        }
    });
});
