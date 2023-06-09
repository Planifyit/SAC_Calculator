(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Calculator Properties</legend>
				<table>
					<tr>
						<td>Button Color</td>
						<td><input id="styling_button_color" type="text" size="40" maxlength="40"></td>
					</tr>
					<tr>
						<td>Display Color</td>
						<td><input id="styling_display_color" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;

	class CalculatorStylingPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							buttonColor: this.buttonColor,
							displayColor: this.displayColor
						}
					}
			}));
		}

		set buttonColor(newColor) {
			this._shadowRoot.getElementById("styling_button_color").value = newColor;
		}

		get buttonColor() {
			return this._shadowRoot.getElementById("styling_button_color").value;
		}

		set displayColor(newColor) {
			this._shadowRoot.getElementById("styling_display_color").value = newColor;
		}

		get displayColor() {
			return this._shadowRoot.getElementById("styling_display_color").value;
		}
	}

	customElements.define("com-sap-sample-calculator-styling", CalculatorStylingPanel);
})();
