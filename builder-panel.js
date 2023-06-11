(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Calculator Properties</legend>
				<table>
					<tr>
						<td>Decimal Places</td>
						<td><input id="builder_decimal_places" type="number" min="0" max="10" step="1"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class CalculatorBuilderPanel extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.getElementById("builder_decimal_places").addEventListener("input", this._onInput.bind(this));
    }

    _onInput(e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("input", {
            detail: {
                decimalPlaces: this.decimalPlaces
            },
            bubbles: true,
            composed: true
        }));
    }

    set decimalPlaces(newDecimalPlaces) {
        this._shadowRoot.getElementById("builder_decimal_places").value = newDecimalPlaces;
    }

    get decimalPlaces() {
        return this._shadowRoot.getElementById("builder_decimal_places").value;
    }
}


	customElements.define("com-sap-sample-calculator-builder", CalculatorBuilderPanel);
})();
