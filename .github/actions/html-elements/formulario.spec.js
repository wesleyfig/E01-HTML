const jsdom = require('jsdom');
const fs = require('fs');

let $ = undefined;
let FILES_PATH = process.env.FILES_PATH;
beforeAll(() => {
    let questionFile = 'formulario.html';
    let html = fs.readFileSync(FILES_PATH + '/' + questionFile);
    let dom = new jsdom.JSDOM(html);
    $ = require('jquery')(dom.window);
});

describe('T5: Formulário de cadastro', () => {
    it('deve ter criado o arquivo formulario.html', () => {
        expect($).toBeDefined();

        let htmlTag = $('html')[0].textContent;
        let headTag = $('head')[0].textContent;
        let bodyTag = $('body')[0].textContent;
        expect(htmlTag).toBeTruthy();
        expect(headTag).toBeTruthy();
        expect(bodyTag).toBeTruthy();
    });

    it('deve conter um formulário', () => {
        let formTags = $('form');
        expect(formTags).toHaveLength(1);
    });

    it('deve conter dois fieldsets', () => {
        let fieldsets = $('form fieldset');
        expect(fieldsets).toHaveLength(2);
    });
    
    describe('Dados pessoais', () => {
        let fieldset = undefined;
        beforeAll(() => {
            fieldset = $('form fieldset')[0];
        });

        it('deve se chamar "Dados pessoais"', () => {
            let legend = $(fieldset).find('legend');
            expect(legend.text().trim().toLowerCase()).toMatch('dados pessoais');
        });
        it('deve conter campo código', () => {
            let codigoField = $(fieldset).find('input')[0];
            expect($(codigoField).attr('disabled')).toBeTruthy();
        });
        it('deve conter campo nome', () => {
            let nomeField = $(fieldset).find('input')[1];
            expect($(nomeField).attr('type')).toBe('text');
        });
        it('deve conter campo senha', () => {
            let senhaField = $(fieldset).find('input')[2];
            expect($(senhaField).attr('type')).toBe('password');
        });
        it('deve conter campo sexo', () => {
            let sexoField1 = $(fieldset).find('input')[3];
            let sexoField2 = $(fieldset).find('input')[4];
            expect($(sexoField1).attr('type')).toBe('radio');
            expect($(sexoField2).attr('type')).toBe('radio');
            expect($(sexoField1).attr('name')).toBe($(sexoField2).attr('name'));
        });
        it('deve conter campo idade', () => {
            let idadeField = $(fieldset).find('input')[5];
            expect($(idadeField).attr('type')).toBe('number');
        });
        it('deve conter campo cartão de crédito', () => {
            let cartaoCredito = $(fieldset).find('select')[0];
            let cartoes = $(cartaoCredito).find('option');

            expect($(cartaoCredito).text()).toBeTruthy();
            for (const cartao of cartoes) {
                expect($(cartao).text()).toBeTruthy();
            }    
        });
    });
    
    describe('Dados profissionais', () => {
        let fieldset = undefined;
        beforeAll(() => {
            fieldset = $('form fieldset')[1];
        });

        it('deve se chamar "Dados profissionais"', () => {
            let legend = $(fieldset).find('legend');
            expect(legend.text().trim().toLowerCase()).toMatch('dados profissionais');
        });
        it('deve conter campo cargo', () => {
            let select = $(fieldset).find('select')[0];
            let options = $(select).find('option');

            expect($(select).text()).toBeTruthy();
            for (const option of options) {
                expect($(option).text()).toBeTruthy();
            }
        });
        it('deve conter campo dados pessoais', () => {
            let inputs = $(fieldset).find('input');
            let name = $(inputs[0]).attr('name');

            expect(inputs).toHaveLength(3);
            expect($(inputs[1]).attr('name')).toBe(name);
            expect($(inputs[2]).attr('name')).toBe(name);
        });
        it('deve conter campo experiências profissionais', () => {
            let textarea = $(fieldset).find('textarea');
            expect($(textarea).text()).toBeDefined();
            expect(parseInt($(textarea).attr('rows'))).toBeGreaterThan(1);
            expect(parseInt($(textarea).attr('cols'))).toBeGreaterThan(1);
        });
    });

    it('deve conter botões de limpar e inserir', () => {
        let submit = $('form > input')[0];
        let reset = $('form > input')[1];

        expect($(submit).attr('value')).toBeTruthy();
        expect($(reset).attr('value')).toBeTruthy();
    });
});