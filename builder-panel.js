(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Calculator Properties</legend>
				<table>
					<tr>
						<td>Number Opacity</td>
						<td><input id="builder_number_opacity" type="text" size="5" maxlength="5"></td>
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
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							numberOpacity: this.numberOpacity
						}
					}
			}));
		}

		set numberOpacity(newOpacity) {
			this._shadowRoot.getElementById("builder_number_opacity").value = newOpacity;
		}

		get numberOpacity() {
			return this._shadowRoot.getElementById("builder_number_opacity").value;
		}
	}

	customElements.define("com-sap-sample-calculator-builder", CalculatorBuilderPanel);
})();
