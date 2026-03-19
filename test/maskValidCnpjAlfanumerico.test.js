const { CnpjAlfanumericoUtils } = require('../assets/maskValidCnpjAlfanumerico');

describe('CnpjAlfanumericoUtils', () => {

    describe('limparValor', () => {
        it('deve permitir letras e números nas primeiras 12 posições e apenas números nas duas últimas', () => {
            expect(CnpjAlfanumericoUtils.limparValor('ABC123DEF45678')).toBe('ABC123DEF45678');
        });

        it('deve remover caracteres não numéricos das últimas 2 posições (DV)', () => {
            expect(CnpjAlfanumericoUtils.limparValor('ABC123DEF456XX')).toBe('ABC123DEF456');
            expect(CnpjAlfanumericoUtils.limparValor('ABC123DEF4567X')).toBe('ABC123DEF4567');
        });

        it('deve limitar a string a no máximo 14 posições válidas', () => {
            expect(CnpjAlfanumericoUtils.limparValor('ABC123DEF4567890')).toBe('ABC123DEF45678');
        });
    });

    describe('aplicarMascara', () => {
        it('deve formatar corretamente a partir de um valor sem pontuação (até 14 caracteres)', () => {
            expect(CnpjAlfanumericoUtils.aplicarMascara('AB')).toBe('AB');
            expect(CnpjAlfanumericoUtils.aplicarMascara('ABC12')).toBe('AB.C12');
            expect(CnpjAlfanumericoUtils.aplicarMascara('ABC123DE')).toBe('AB.C12.3DE');
            expect(CnpjAlfanumericoUtils.aplicarMascara('ABC123DEF456')).toBe('AB.C12.3DE/F456');
            expect(CnpjAlfanumericoUtils.aplicarMascara('ABC123DEF45678')).toBe('AB.C12.3DE/F456-78');
        });
    });

    describe('validarPreenchimento', () => {
        it('deve retornar false se não tiver 14 caracteres válidos', () => {
            expect(CnpjAlfanumericoUtils.validarPreenchimento('AB.C12.3DE/F456-7')).toBe(false);
            expect(CnpjAlfanumericoUtils.validarPreenchimento('')).toBe(false);
        });

        it('deve retornar true se tiver exatamente 14 caracteres válidos', () => {
            expect(CnpjAlfanumericoUtils.validarPreenchimento('AB.C12.3DE/F456-78')).toBe(true);
        });
    });
});
