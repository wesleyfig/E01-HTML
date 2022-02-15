const jsdom = require('jsdom');
const fs = require('fs');

let $ = undefined;
let FILES_PATH = process.env.FILES_PATH;
beforeAll(() => {
    let questionFile = 'tutorial_c.html';
    let html = fs.readFileSync(FILES_PATH + '/' + questionFile);
    let dom = new jsdom.JSDOM(html);
    $ = require('jquery')(dom.window);
});

describe('T4: Manual de Programação', () => {
    it('deve ter criado o arquivo tutorial_c.html', () => {
        expect($).toBeDefined();

        let htmlTag = $('html')[0].textContent;
        let headTag = $('head')[0].textContent;
        let bodyTag = $('body')[0].textContent;
        expect(htmlTag).toBeTruthy();
        expect(headTag).toBeTruthy();
        expect(bodyTag).toBeTruthy();
    });


    it('deve ter um título geral', () => {
        let h1Tags = $('body h1');
        expect(h1Tags).toHaveLength(1);
        expect(h1Tags[0].textContent).toBeTruthy();
    });
    it('deve ter pelo menos três seções', () => {
        let divTags = $('body > div');
        expect(divTags.length).toBeGreaterThanOrEqual(3);
    });
    it('deve haver subtítulo em cada seção', () => {
        let divTags = $('body > div');

        for (const divTag of divTags) {
            let h2Tags = $(divTag).find('h2');
            expect(h2Tags).toHaveLength(1);
            expect(h2Tags[0].textContent).toBeTruthy();
        }
    });
    it('deve haver pelo menos dois elementos textuais em cada seção', () => {
        let divTags = $('body > div');

        for (const divTag of divTags) {
            let textTags = $(divTag).find('p, b, ul, ol, i, em, code');
            expect(textTags.length).toBeGreaterThanOrEqual(2);
        }
    });
    
    describe('Seção de Exemplo', () => {
        it('deve haver uma seção entitulada "Exemplo"', () => {
            let h2Tags = $('body > div > h2')
                .get()
                .map((i) => $(i).text());

            expect(h2Tags).toEqual(expect.arrayContaining(['Exemplo']));
        });
        it('deve haver um trecho de código multinha', () => {
            let multilineCode = $('body > div > pre > code');
            expect(multilineCode.length).toBeGreaterThanOrEqual(1);
        });
    });
});