(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Calculator Properties</legend>
				<table>
					<tr>
						<td>Equal Button Color</td>
						<td><input id="styling_equal_color" type="text" size="40" maxlength="40"></td>
					</tr>
					<tr>
						<td>Clear Button Color</td>
						<td><input id="styling_clear_color" type="text" size="40" maxlength="40"></td>
					</tr>
					<tr>
						<td>Numbers Color</td>
						<td><input id="styling_number_color" type="text" size="40" maxlength="40"></td>
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
							equalColor: this.equalColor,
							clearColor: this.clearColor,
							numberColor: this.numberColor
						}
					}
			}));
		}

		set equalColor(newColor) {
			this._shadowRoot.getElementById("styling_equal_color").value = newColor;
		}

		get equalColor() {
			return this._shadowRoot.getElementById("styling_equal_color").value;
		}

		set clearColor(newColor) {
			this._shadowRoot.getElementById("styling_clear_color").value = newColor;
		}

		get clearColor() {
			return this._shadowRoot.getElementById("styling_clear_color").value;
		}
		set numberColor(newColor) {
			this._shadowRoot.getElementById("styling_number_color").value = newColor;
		}

		get numberColor() {
			return this._shadowRoot.getElementById("styling_number_color").value;
		}
	}

	customElements.define("com-sap-sample-calculator-styling", CalculatorStylingPanel);
})();
