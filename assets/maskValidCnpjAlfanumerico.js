/*!
 * CnpjAlfanumericoUtils & Mask v1.1.0
 * Autor: Rogério Saraceni
 * Licença: MIT
 */

const CnpjAlfanumericoUtils = {
    limparValor(value) {
        let limpo = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        let base = limpo.substring(0, 12);
        let dv = limpo.substring(12, 14).replace(/[^0-9]/g, '');
        return base + dv;
    },

    aplicarMascara(value) {
        let formatted = '';
        if (value.length > 0) formatted = value.substring(0, 2);
        if (value.length > 2) formatted += '.' + value.substring(2, 5);
        if (value.length > 5) formatted += '.' + value.substring(5, 8);
        if (value.length > 8) formatted += '/' + value.substring(8, 12);
        if (value.length > 12) formatted += '-' + value.substring(12, 14);
        return formatted;
    },

    // Converte cada caractere para o valor usado no cálculo do DV
    // Dígitos 0-9 -> 0-9 | Letras A-Z -> 17-42 (charCode - 48)
    valorCaractere(char) {
        return char.charCodeAt(0) - 48;
    },

    // Calcula um dígito verificador dado o corpo (12 chars, ou 12+DV1 no caso do segundo dígito)
    calcularDV(base, pesos) {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += this.valorCaractere(base[i]) * pesos[i];
        }
        let resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    },

    // Valida se os dois últimos dígitos batem com o cálculo sobre os 12 primeiros
    validarDV(valorCompleto) {
        if (valorCompleto.length !== 14) return false;

        let corpo = valorCompleto.substring(0, 12);
        let dvInformado = valorCompleto.substring(12, 14);

        if (!/^[0-9]{2}$/.test(dvInformado)) return false;

        const pesosDV1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const pesosDV2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        let dv1 = this.calcularDV(corpo, pesosDV1);
        let dv2 = this.calcularDV(corpo + dv1, pesosDV2);

        return dvInformado === `${dv1}${dv2}`;
    },

    validarPreenchimento(valorInput) {
        let limpo = valorInput.toUpperCase().replace(/[^A-Z0-9]/g, '');
        return this.validarDV(limpo);
    }
};

function maskValidCnpjAlfanumerico() {

    // Conta quantos caracteres alfanuméricos existem antes de uma posição do texto mascarado
    function contarAlfanumericosAte(texto, pos) {
        return texto.substring(0, pos).replace(/[^A-Z0-9]/gi, '').length;
    }

    // Dado o texto final mascarado e a quantidade de alfanuméricos que devem
    // ficar antes do cursor, encontra a posição correspondente no texto mascarado
    function posicaoParaCursor(textoMascarado, qtdAlfanumericos) {
        if (qtdAlfanumericos <= 0) return 0;
        let contador = 0;
        for (let i = 0; i < textoMascarado.length; i++) {
            if (/[A-Z0-9]/i.test(textoMascarado[i])) {
                contador++;
                if (contador === qtdAlfanumericos) return i + 1;
            }
        }
        return textoMascarado.length;
    }

    function onInput() {
        let el = this;
        let $el = $(el);

        let valorBruto = el.value.toUpperCase();
        let posCursorOriginal = el.selectionStart;

        // Quantos caracteres válidos existiam antes do cursor, no valor ainda não mascarado
        let qtdAntesDoCursor = contarAlfanumericosAte(valorBruto, posCursorOriginal);

        let valorLimpo = CnpjAlfanumericoUtils.limparValor(valorBruto);
        let valorFormatado = CnpjAlfanumericoUtils.aplicarMascara(valorLimpo);

        $el.val(valorFormatado);

        let novaPosicao = posicaoParaCursor(valorFormatado, qtdAntesDoCursor);
        el.setSelectionRange(novaPosicao, novaPosicao);
    }

    function onBlur() {
        const isValid = CnpjAlfanumericoUtils.validarPreenchimento($(this).val());
        const temConteudo = $(this).val().replace(/[^A-Z0-9]/gi, '').length > 0;

        $(this)
            .toggleClass('is-invalid', temConteudo && !isValid)
            .toggleClass('is-valid', temConteudo && isValid);
    }

    function onSubmit(e) {
        let formValido = true;

        $(e.target).find('input[mask-valid-input="cnpjAlfanumerico"]').each(function () {
            const valido = CnpjAlfanumericoUtils.validarPreenchimento($(this).val());
            $(this).toggleClass('is-invalid', !valido).toggleClass('is-valid', valido);
            if (!valido) formValido = false;
        });

        if (!formValido) {
            e.preventDefault();
            alert('Por favor, preencha o CNPJ corretamente.');
        }
    }

    $(document)
        .on('input', 'input[mask-valid-input="cnpjAlfanumerico"]', onInput)
        .on('blur', 'input[mask-valid-input="cnpjAlfanumerico"]', onBlur)
        .on('submit', 'form', onSubmit);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CnpjAlfanumericoUtils, maskValidCnpjAlfanumerico };
} else {
    $(document).ready(function () {
        maskValidCnpjAlfanumerico();
    });
}
