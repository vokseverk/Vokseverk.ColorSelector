import { LitElement, html, css } from '@umbraco-cms/backoffice/external/lit'

const hexColorRE = /^#?([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i
const colorFuncRE = /^(rgba?|hsla?|lcha?)\(.+?\)$/
const colorName = /^[a-zA-Z]+$/

class ColorSelector extends LitElement {

	#internalValue = 'transparent'
	#internalCustomValue = 'hotpink'
	#internalPresets

	static properties = {
		value: {}
	}

	static styles = css`
		:host { display:flex; gap: 2rem; }
		:host > div { display: flex; flex-direction: column; gap: 8px; }
		.preview { margin-inline-end: var(--uui-size-1); display: flex; }
		uui-color-swatches { margin-block-start: 4px; }
	`

	get presets() {
		return this.#internalPresets
	}

	set presets(newValue) {
		if (newValue.some(v => v !== '')) {
			this.#internalPresets = newValue.filter(p => p !== '')
		} else {
			this.#internalPresets = [ ]
		}
	}

	set config(data) {
		const p1 = data.getValueByAlias('preset1') || ''
		const p2 = data.getValueByAlias('preset2') || ''
		const p3 = data.getValueByAlias('preset3') || ''
		const p4 = data.getValueByAlias('preset4') || ''
		const p5 = data.getValueByAlias('preset5') || ''

		this.presets = [p1, p2, p3, p4, p5]
		this.hideManualInput = data.getValueByAlias('hideManualInput') === true
	}

	render() {
		return html`
			${this.hideManualInput ? '' :
				html`<div>
					<uui-label for="customcolor"><umb-localize key="color_inputColor">Input some CSS color</umb-localize></uui-label>
					<uui-input id="customcolor" .value=${this.value} @input=${this.onInput}>
						<div slot="append" class="preview"><uui-color-swatch .value=${this.value}></uui-color-swatch></div>
					</uui-input>
				</div>`
			}
			<div>
				${this.hideManualInput ? '' :
					html`<uui-label for="colorpreset"><umb-localize key="${this.labelKey()}">Presets</umb-localize></uui-label>`
				}
				<uui-color-swatches id="colorpreset" .value=${this.value || '#fff'} @change=${this.changed}>
					${this.presets.map(preset => {
						return html`<uui-color-swatch .value=${preset}></uui-color-swatch>`
					})}
				</uui-color-swatches>
			</div>
		`
	}

	labelKey () {
		if (this.hideManualInput) {
			return "color_choosePreset"
		} else {
			return "color_orChoosePreset"
		}
	}

	get value() {
		return this.#internalValue;
	}

	set value(newValue) {
		if (newValue != null && newValue != '') {
			this.#internalValue = newValue
			this.dispatchEvent(new CustomEvent('change'))
		}
	}

	onInput(event) {
		const val = event.target.value || ''
		const valid = isValidCSSColor(val)

		if (valid) {
			this.value = val
		}
	}

	changed(event) {
		this.value = event.target.value
	}

}

function isValidCSSColor(color) {
	// Hex and rgb/hsl/lch colors are reasonably detectable
	if (hexColorRE.test(color) || colorFuncRE.test(color)) {
		return true
	} else {
		// Okay? Then let's see if it sticks
		const elem = document.createElement('p')
		elem.style.color = color

		return elem.style.color.toLowerCase() !== ''
	}
}

customElements.define('color-selector', ColorSelector)
