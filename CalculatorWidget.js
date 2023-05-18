(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
            .calculator {
                display: flex;
                flex-direction: column;
                width: 200px;
                background-color: #f0f0f0;
                border-radius: 4px;
                padding: 10px;
            }

            .display {
                margin-bottom: 10px;
                background-color: #fff;
                height: 30px;
                border: none;
                padding: 5px;
                text-align: right;
                border-radius: 4px;
            }

            .buttons {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 5px;
            }

            .buttons > button {
                height: 30px;
                border: none;
                color: #fff;
                border-radius: 4px;
            }

            .buttons > button:active {
                transform: scale(0.95);
            }

            .buttons > button:nth-child(-n+3) {
                background-color: #f77;
            }

            .buttons > button:nth-child(n+4):nth-child(-n+6) {
                background-color: #7f7;
            }

            .buttons > button:nth-child(n+7):nth-child(-n+9) {
                background-color: #77f;
            }

            .buttons > button:nth-child(n+10) {
                background-color: #777;
            }
        </style>
        <div class="calculator">
            <input type="text" class="display" disabled>
            <div class="buttons">
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>*</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>/</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>-</button>
                <button>0</button>
                <button>.</button>
                <button>=</button>
                <button>+</button>
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
