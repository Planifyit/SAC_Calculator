
(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
            /* Add your CSS styling here */
        </style>
        <div class="calculator">
            <input type="text" class="display" disabled>
            <div class="buttons">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>+</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>-</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>*</button>
                <button>.</button>
                <button>0</button>
                <button>/</button>
                <button>=</button>
            </div>
        </div>
    `;

    class Calculator extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: 'open'});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._display = this._shadowRoot.querySelector('.display');
            this._buttons = Array.from(this._shadowRoot.querySelectorAll('button'));
            this._operation = '';
        }

        connectedCallback() {
            this._buttons.forEach(button => {
                button.addEventListener('click', this._onButtonClick.bind(this));
            });
        }

        _onButtonClick(event) {
            const value = event.target.textContent;

            switch(value) {
                case '+':
                case '-':
                case '*':
                case '/':
                    this._operation += ` ${value} `;
                    break;
                case '=':
                    try {
                        this._display.value = eval(this._operation);
                        this._operation = '';
                    } catch(e) {
                        console.error(e);
                        this._display.value = 'Error';
                        this._operation = '';
                    }
                    break;
                default:
                    this._operation += value;
            }

            this._display.value = this._operation;
        }
    }

    customElements.define('calculator-widget', Calculator);
})();
