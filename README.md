# Mask Valid CNPJ Alfanumérico

[🌐 Acesse a Demonstração Online](https://mask-valid-cnpj-alfanumerico.vercel.app/)

Um projeto demonstrativo e funcional para lidar com a nova formatação do Cadastro Nacional da Pessoa Jurídica (CNPJ) no Brasil, que passará a aceitar caracteres alfanuméricos a partir de julho de 2026.

## 📝 Sobre o Projeto

A partir de 2026, o CNPJ deixará de ser composto apenas por números (`NN.NNN.NNN/NNNN-NN`) e passará a ter o formato alfanumérico (`SS.SSS.SSS/SSSS-NN`), onde:

- **S (posições 1 a 12):** Letras maiúsculas ou Números. Identificam a raiz da empresa (8 posições) e a filial (4 posições).
- **N (posições 13 e 14):** Apenas Números. Correspondem aos dígitos verificadores.

Este repositório contém uma implementação em JavaScript/jQuery para aplicar a máscara correta e validar o preenchimento dos campos de CNPJ alfanumérico em formulários web, garantindo que o usuário digite o formato correto e na quantidade exata de caracteres.

## 🚀 Tecnologias Utilizadas

- **HTML5** / **CSS3**
- **Bootstrap 5.3.8** (Estilização da interface de demonstração)
- **jQuery 4.0.0** (Manipulação do DOM e eventos)
- **JavaScript** (Lógica da máscara e validação)

## ⚙️ Funcionalidades e Regras de Negócio

O script principal `assets/maskValidCnpjAlfanumerico.js` aplica as seguintes regras em inputs definidos:

1. **Máscara em tempo real:** Formata o valor digitado automaticamente para `SS.SSS.SSS/SSSS-NN`.
2. **Filtro de caracteres:** Permite apenas letras de A a Z e números de 0 a 9 nas primeiras 12 posições. As posições 13 e 14 aceitam unicamente números.
3. **Conversão de caixa:** Converte todas as letras digitadas para **maiúsculas**.
4. **Validação ao perder o foco (Blur):** Adiciona destaque visual de erro (classe `.is-invalid`) caso o campo seja abandonado incompleto (menos de 14 caracteres úteis).
5. **Bloqueio de envio (Submit):** Intercepta e impede o envio do formulário (`e.preventDefault()`) alertando o usuário se houver algum campo de CNPJ com preenchimento parcial.

## 💻 Como Usar no Seu Projeto

1. Adicione o jQuery e o script da máscara ao seu HTML:

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="caminho/para/maskValidCnpjAlfanumerico.js"></script>
```

2. Em seus campos de formulário, adicione o atributo `mask-valid-input="cnpjAlfanumerico"`:

```html
<input 
    type="text" 
    name="cnpj" 
    class="form-control" 
    mask-valid-input="cnpjAlfanumerico" 
    placeholder="ss.sss.sss/ssss-nn" 
    required 
/>
```

O script inicializa automaticamente ao ser carregado.

## 🧪 Testes Unitários

O projeto utiliza **Jest** para garantir que as funções de limpeza, aplicação de máscara e validação funcionem corretamente.

Para executar os testes, certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode os testes:
   ```bash
   npm test
   ```

## 📚 Fontes e Referências

- [Faciap - Brasil vai adotar oficialmente o CNPJ alfanumérico a partir de julho de 2026](https://site.faciap.org.br/brasil-vai-adotar-oficialmente-o-cnpj-alfanumerico-a-partir-de-julho-de-2026/)
- [Blog TecnoSpeed - Tudo sobre o novo CNPJ Alfanumérico](https://blog.tecnospeed.com.br/cnpj-alfanumerico/)