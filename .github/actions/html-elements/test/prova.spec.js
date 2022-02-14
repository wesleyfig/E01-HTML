const jsdom = require('jsdom');
const fs = require('fs');

let $ = undefined;
let FILES_PATH = process.env.FILES_PATH;
beforeAll(() => {
    let questionFile = 'prova.html';
    let html = fs.readFileSync(FILES_PATH + '/' + questionFile);
    let dom = new jsdom.JSDOM(html);
    $ = require('jquery')(dom.window);
});

describe('T2: Prova de Múltipla Escolha', () => {
   
    it('deve ter criado o arquivo prova.html', () => {
        expect($).toBeDefined();

        let htmlTag = $('html')[0].textContent;
        let headTag = $('head')[0].textContent;
        let bodyTag = $('body')[0].textContent;
        expect(htmlTag).toBeTruthy();
        expect(headTag).toBeTruthy();
        expect(bodyTag).toBeTruthy();
    });

    it('deve ter pelo menos cinco questões', () => {
        let liTags = $('ol > li');

        expect(liTags).toHaveLength(5);
        for (const liTag of liTags) {
            expect(liTag.textContent).toBeTruthy();
        }
    });

    it('as questões devem ter pelo menos cinco alternativas', () => {
        let ulTags = $('ol ul');
        expect(ulTags).toHaveLength(5);
 
        for (const ulTag of ulTags) {
            expect(ulTag.textContent).toBeTruthy();
            expect($(ulTag).find('li')).toHaveLength(4);
        }
    });
});