(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<div>
        <p>Scroll down and then click the button to return to the top</p>
        <button id="scrollBtn">Go to top</button>
    </div>`;   
   
    class ScrollToTop extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._buttonElement = this._shadowRoot.querySelector('#scrollBtn');
            this._buttonElement.addEventListener('click', this.scrollToTop.bind(this));
        }

        scrollToTop() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    customElements.define('scroll-to-top-button', ScrollToTop);
})();
