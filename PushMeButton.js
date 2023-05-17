(function() {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
    <style>
      #push-me-button {
        width: 100px;
        height: 50px;
      }
    </style>
    <button id="push-me-button">Push Me</button>
  `;

  class PushMeButton extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
      this.$button = this._shadowRoot.querySelector('#push-me-button');

      this.$button.addEventListener('click', (e) => {
        this.$button.innerHTML = 'You Pushed Me';
        var event = new CustomEvent('onPush');
        this.dispatchEvent(event);
      });
    }
  }

  customElements.define('push-me-button', PushMeButton);
})();
