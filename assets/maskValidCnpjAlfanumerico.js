const CnpjAlfanumericoUtils = {
    limparValor(value) {
        let parteAlfa = value.substring(0, 12);
        let parteDV = value.substring(12, 14).replace(/[^0-9]/g, '');
        return (parteAlfa + parteDV).substring(0, 14);
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

    validarPreenchimento(valorInput) {
        return valorInput.replace(/[^A-Z0-9]/gi, '').length === 14;
    }
};

function maskValidCnpjAlfanumerico() {
    // --- Handlers dos eventos ---
    function onInput() {
        let value = $(this)
            .val()
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
        $(this).val(CnpjAlfanumericoUtils.aplicarMascara(CnpjAlfanumericoUtils.limparValor(value)));
    }

    function onBlur() {
        const valueLimpo = $(this)
            .val()
            .replace(/[^A-Z0-9]/gi, '');
        const incompleto = valueLimpo.length > 0 && valueLimpo.length < 14;
        $(this).toggleClass('is-invalid', incompleto);
    }

    function onSubmit(e) {
        $('input[mask-valid-input="cnpjAlfanumerico"]').each(function () {
            if (!CnpjAlfanumericoUtils.validarPreenchimento($(this).val())) {
                e.preventDefault();
                alert('Por favor, preencha o CNPJ completamente.');
            }
        });
    }

    // --- Registro dos eventos ---
    $(document)
        .on('input', 'input[mask-valid-input="cnpjAlfanumerico"]', onInput)
        .on('blur', 'input[mask-valid-input="cnpjAlfanumerico"]', onBlur);

    $('form').on('submit', onSubmit);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CnpjAlfanumericoUtils, maskValidCnpjAlfanumerico };
} else {
    maskValidCnpjAlfanumerico();
}