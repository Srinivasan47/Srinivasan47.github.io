/**
  * Get hint JSON encrypted data
  * @param hintId @type integer - id of the hint to load
  * @returns JSON encoded data for the requested hint {message, audio, imageOverlay}
  * TBD by: Softcrylic
  */
function getHint(hintId, itemId, productID) {
  console.log('TBD: get hint JSON encrypted data');

  // randomly generate an error message
  if (Math.random() < 0.25) {
    return {
      status: 'error',
      message: '<p>Server Timed out. Try Opening Hint Again.</p>'
    };
  }

  var hints = {
      "hint": [
        {
          math: [
            {
              id: 0,
              mathml: '<math><br>        <mrow selected="true"><br>                <msub><br>                        <mi>x</mi><br>                        <mtext>12</mtext><br>                </msub><br>                <mo>=</mo><br>                <mfrac linethickness="1"><br>                        <mrow><br>                                <mo>-</mo><br>                                <mi>b</mi><br>                                <mo>&#xB1;</mo><br>                                <msqrt linethickness="1"><br>                                        <msup><br>                                                <mi>b</mi><br>                                                <mn>2</mn><br>                                        </msup><br>                                        <mo>-</mo><br>                                        <mn>4</mn><br>                                        <mi>a</mi><br>                                        <mi>c</mi><br>                                </msqrt><br>                        </mrow><br>                        <mrow><br>                                <mn>2</mn><br>                                <mi>a</mi><br>                        </mrow><br>                </mfrac><br>        </mrow><br></math>'
            },
            {
              id: 1,
              mathml: '<math><br>        <mrow><br>                <msup><br>                        <mi selected="true">x</mi><br>                        <mn>2</mn><br>                </msup><br>                <mo>+</mo><br>                <mn>2</mn><br>                <mi>x</mi><br>                <mo>+</mo><br>                <mn>1</mn><br>                <mo>=</mo><br>                <mn>0</mn><br>        </mrow><br></math>'
            },
            {
              id: 2,
              mathml: '<math><br>        <mrow selected="true"><br>                <msup><br>                        <mo>sin</mo><br>                        <mn>2</mn><br>                </msup><br>                <mi>&#x3B8;</mi><br>                <mo>+</mo><br>                <msup><br>                        <mo>cos</mo><br>                        <mn>2</mn><br>                </msup><br>                <mi>&#x3B8;</mi><br>                <mo>=</mo><br>                <mn>1</mn><br>        </mrow><br></math>'
            }
          ],
          message: '<p>Read the text! SF:)&nbsp;<img alt="Fmath image asset" math_id="0" title="Fmath image asset"/>&nbsp;&nbsp;<img alt="Fmath image asset" math_id="1" title="Fmath image asset"/>&nbsp;&nbsp;<img alt="Fmath image asset" math_id="2" title="Fmath image asset"/></p>', 
          audio: "assets/sounds/hint_1.mp3"
        },
        {
          math: [
            {
              id: 0,
              mathml: '<math><br>        <mrow selected="true"><br>                <msub><br>                        <mi>x</mi><br>                        <mtext>12</mtext><br>                </msub><br>                <mo>=</mo><br>                <mfrac linethickness="1"><br>                        <mrow><br>                                <mo>-</mo><br>                                <mi>b</mi><br>                                <mo>&#xB1;</mo><br>                                <msqrt linethickness="1"><br>                                        <msup><br>                                                <mi>b</mi><br>                                                <mn>2</mn><br>                                        </msup><br>                                        <mo>-</mo><br>                                        <mn>4</mn><br>                                        <mi>a</mi><br>                                        <mi>c</mi><br>                                </msqrt><br>                        </mrow><br>                        <mrow><br>                                <mn>2</mn><br>                                <mi>a</mi><br>                        </mrow><br>                </mfrac><br>        </mrow><br></math>'
            }
          ],
          message: "<p>What's the <strong>definition</strong> of '<em>professional</em> schoolmaster'?&nbsp;  <img alt='Fmath image asset' math_id='0' title='Fmath image asset'/></p>",
          overlay: 'data:image/png;base64,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AgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAAB6Yy6ZgAADaVJREFUAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEvhrynTWljlikGsAAAAASUVORK5CYII=',
          audio: "assets/sounds/hint_3.mp3"
        },
        {message: "<p>See the <strong><em>first</em></strong> <em><strong>paragraph</strong></em>!</p>"}
      ]
    };
  var hintArray = hints.hint;
  
  return hintArray[hintId];
}

/**
  *  Get asset JSON data
  * @param assetId @type integer - id of the asset requested
  * @returns JSON object {id, name, type, path}
  * TBD by: XQuire
  */
function getAsset(assetId) {
  console.log('TBD: return encoded json item data');  
  var assets = [
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(p1).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Passage 1 HTML",
      "im0": "iconText.gif",
      "type": 'text',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/text/passage1.html"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(h1).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Hint 1 mp3",
      "im0": "iconGraph.gif",
      "type": 'audio',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/sounds/hint_1.mp3"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(h2).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Hint 2 mp3",
      "im0": "iconGraph.gif",
      "type": 'audio',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/sounds/hint_2.mp3"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(h3).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Hint 3 mp3",
      "im0": "iconGraph.gif",
      "type": 'audio',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/sounds/hint_3.mp3"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(11).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "FPO_fish_blue.png",
      "im0": "iconGraph.gif",
      "type": 'images',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/images/FPO_fish_blue.png"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(12).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "FPO_fish_red.png",
      "im0": "iconGraph.gif",
      "type": 'images',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/images/FPO_fish_red.png"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(13).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "FPO_fish_bowl_no_fish.jpg",
      "im0": "iconGraph.gif",
      "type": 'images',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/images/FPO_fish_bowl_no_fish.jpg"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(14).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "img_(11).png",
      "im0": "iconGraph.gif",
      "type": 'images',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/images/overlay_4.png"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(15).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "img_(12).jpg",
      "im0": "iconGraph.gif",
      "type": 'images',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/images/overlay_5.png"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(16).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Continuous Positive Airway Pressure (CPAP), Dual-level, Respiratory Therapy",
      "im0": "iconText.gif",
      "type": 'text',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/text/1.txt"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(17).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "img_(13).jpg",
      "im0": "iconGraph.gif",
      "type": 'images',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/images/sample_hint_overlay_multiple_choice.png"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(18).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Introduction",
      "im0": "iconText.gif",
      "type": 'text',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/text/2.txt"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(19).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Equipment1, 2 3",
      "im0": "iconText.gif",
      "type": 'text',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/text/3.txt"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(v1).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Video 1 FLV",
      "im0": "iconVideo.gif",
      "type": 'video',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/video/20051210-w50s_56K.flv"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(v2).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Video 2 FLV",
      "im0": "iconVideo.gif",
      "type": 'video',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/video/barsandtone.flv"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(v3).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Video 3 MP4",
      "im0": "iconVideo.gif",
      "type": 'video',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/video/krampage-intro.mp4"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(v4).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Video 4 MP4",
      "im0": "iconVideo.gif",
      "type": 'video',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/video/409-active-model-serializers.mp4"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(v5).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Video 5 WEBM",
      "im0": "iconVideo.gif",
      "type": 'video',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/video/390-turbolinks.webm"
    },
    {
      "id": "uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/images/img_(v6).jpg^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/OEBPS/^/uploads/NUGDVZ384362206/cross/n9c15da6666446049/ne7d6eeccc717bb23/ne7d6eeccc717bb23_master.xml",
      "text": "Video 6 WEBM",
      "im0": "iconVideo.gif",
      "type": 'video',
      "id-project": "Continuous-sent-by-Lu",
      "uri": "assets/video/400-what-s-new-in-rails-4.webm"
    },    
  ];
  
  for (var assetsIndex = 0; assetsIndex < assets.length; assetsIndex++) {
    if (assets[assetsIndex].id == assetId) {
      return assets[assetsIndex];
    }
  }
  
  return {};
}

/**
  * Check answer
  * @param itemID @type string - id of the item we check the answer for
  * @param answerData @type object - JSON encoded data build and provided by the FG team
  * @param callback @type function - the function to call after answerData has been processed
  * TBD by: Softcrylic
  */
function checkAnswer(itemID, answerData, productID, callback) {
  console.log('TBD: check answer and provide feedback - JSON encrypted data');
  // this returns random response to simulate possible responses
  // this function will also trigger answer display into the hints / feedback box
  
  /*itemID = itemID.split(/_assignmentId=/);
  itemID = itemID[0];
  console.log('checkAnswer itemID:', itemID);
  console.log('checkAnswer data:', answerData);*/
  
	/*var assignmentId = window.location.href.match(/assignmentId=.+/g)[0].match(/[^=]+/g)[1];
	var currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId);
	var userProfile = window.waggleui.model.getUserProfile();
	var currentClassObject = window.waggleui.model.getCurrentClassObject();*/
	
  	var completeObject = window.waggleui.model.getAmsStandAloneItem();
  
    var preferenceObj = {
		'studentId': completeObject['profile']['studentId'],    
		'knewtonId': completeObject['profile']['knewtonId'],
		'year': completeObject['profile']['year'],
		'assignmentId': completeObject['assignment']['info']['assignmentId'],
		'studentAssignmentId': completeObject['assignment']['info']['studentAssignmentId'],
		'goalId': completeObject['assignment']['info']['goalId'],
		'knewtonGoalId': completeObject['assignment']['info']['knewtonGoalId'],
		'knewtonLearningInstanceId': completeObject['assignment']['info']['knewtonLearningInstanceId'],
		'knewtonRegistrationId': completeObject['assignment']['info']['knewtonRegistrationId'],
		'itemId': completeObject['item']['itemId'],
		'selected_answers': answerData['selected_answers'],
		'hints_used': answerData['hints_used'],
		'am_code': answerData['am_code'],
		'classId': completeObject['assignment']['info']['classId'],
		'classViewId': completeObject['assignment']['info']['classViewId'],
		'classViewRegId': completeObject['assignment']['info']['classViewRegId'],
		'activeTime': convertSecondsToHMS (itemSessionSecondsCount) // i am itemSessionSecondsCount, coming from global.js
	};
	if(answerData['answer_type']) {
		preferenceObj['answer_type'] = answerData['answer_type']; 
	}
	if(answerData['totalHotSpots']) {
		preferenceObj['totalHotSpots'] = answerData['totalHotSpots']; 
	}
	if(answerData['studentResponse']){
		preferenceObj['studentResponse'] = answerData['studentResponse'];
		delete preferenceObj['selected_answers'];
	}
	if(answerData['studentResponseId']){
		preferenceObj['studentResponseId'] = answerData['studentResponseId'];
	}
  var response = window.waggleui.services.checkAnswer(preferenceObj);  

  if(response.state === 'incorrect'){
	  console.log("response is incorrect");
	  startItemSession(itemSessionSecondsCount);
  }else{
	  if(response.state === 'correct'){
		  console.log("response is correct");
		  window.clearInterval(itemSession);	
	  }
  }
  /*switch (Math.floor(Math.random() * 4)) {
    //0 - incorrect response
    case 0:
      response.state = 'incorrect';
      response.message = '<p>Try again</p>';
    break;
    //1 - correct response
    case 1:
      response.state = 'correct';
      response.math = [
          {
            id: 0,
            mathml: '<math><br>        <mrow selected="true"><br>                <msub><br>                        <mi>x</mi><br>                        <mtext>12</mtext><br>                </msub><br>                <mo>=</mo><br>                <mfrac linethickness="1"><br>                        <mrow><br>                                <mo>-</mo><br>                                <mi>b</mi><br>                                <mo>&#xB1;</mo><br>                                <msqrt linethickness="1"><br>                                        <msup><br>                                                <mi>b</mi><br>                                                <mn>2</mn><br>                                        </msup><br>                                        <mo>-</mo><br>                                        <mn>4</mn><br>                                        <mi>a</mi><br>                                        <mi>c</mi><br>                                </msqrt><br>                        </mrow><br>                        <mrow><br>                                <mn>2</mn><br>                                <mi>a</mi><br>                        </mrow><br>                </mfrac><br>        </mrow><br></math>'
          },
          {
            id: 1,
            mathml: '<math><br>        <mrow><br>                <msup><br>                        <mi selected="true">x</mi><br>                        <mn>2</mn><br>                </msup><br>                <mo>+</mo><br>                <mn>2</mn><br>                <mi>x</mi><br>                <mo>+</mo><br>                <mn>1</mn><br>                <mo>=</mo><br>                <mn>0</mn><br>        </mrow><br></math>'
          },
          {
            id: 2,
            mathml: '<math><br>        <mrow selected="true"><br>                <msup><br>                        <mo>sin</mo><br>                        <mn>2</mn><br>                </msup><br>                <mi>&#x3B8;</mi><br>                <mo>+</mo><br>                <msup><br>                        <mo>cos</mo><br>                        <mn>2</mn><br>                </msup><br>                <mi>&#x3B8;</mi><br>                <mo>=</mo><br>                <mn>1</mn><br>        </mrow><br></math>'
          }
      ];
      
      response.message = '<p>You got it!&nbsp;<img alt="Fmath image asset" math_id="0" title="Fmath image asset"/>&nbsp;&nbsp;<img alt="Fmath image asset" math_id="1" title="Fmath image asset"/>&nbsp;&nbsp;<img alt="Fmath image asset" math_id="2" title="Fmath image asset"/></p>';
      response.sound = 'assets/sounds/hint_3.mp3';
      response.overlay = 'data:image/png;base64,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AgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAAB6Yy6ZgAADaVJREFUAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEhBQB+psTSVAgAABAgQI9CAgoPbQS+pIgAABAgQIEBhIQEAdqLM1lQABAgQIECDQg4CA2kMvqSMBAgQIECBAYCABAXWgztZUAgQIECBAgEAPAgJqD72kjgQIECBAgACBgQQE1IE6W1MJECBAgAABAj0ICKg99JI6EiBAgAABAgQGEvhrynTWljlikGsAAAAASUVORK5CYII=';
    break;
    //2 - misconception response - should return the id of the misconception
    case 2:
      response.state = 'misconception';
      response.message = '<p>Misconception! Try again.</p>';
      response.overlay = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA7YAAAHwCAYAAACSZPPAAAAgAElEQVR4Xu3dgXEc1bIG4HsjACKwiAAcASYCTATIEWAiQESAicAiAiACdCOAGwG6EcCNgNddb/eVnsq2tq3d2e6Zb6pOSbaPZvp8fcrl3zs7+89/OAgQIECAAAECBAgQIECAwGCBfw6uXekECBAgQIAAAQIECBAgQOAfgq1NQIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QIAAAQIECBAgQIAAAQKjBQTb0e1TPAECBAgQIECAAAECBAgItvYAAQIECBAgQIAAAQIECIwWEGxHt0/xBAgQIECAAAECBAgQICDY2gMECBAgQIAAAQIECBAgMFpAsB3dPsUTIECAAAECBAgQIECAgGBrDxAgQIAAAQIECBAgQIDAaAHBdnT7FE+AAAECBAgQIECAAAECgq09QGAbAp/GMl/HyK9/xbiJ8WOMn7exfKskQIAAAQIECBBYs4Bgu+buWhuB/xX4MMYfu6/3TV7Fb1zEeL77gx/i60twBAgQIECAAAECBCYJCLaTuqVWAu8ncBk/lq/WHnr4e+FQKfMIECBAgAABAgRaCPgHbIs2KILASQWu4+xfPXCFp/Hnv+3m+HvhpO1wcgIECBAgQIAAgWML+AfssUWdj0A/gdso6ckDZeUtyF8Ltv2apyICBAgQIECAAIGHBQTbh43MIDBd4O8DFpAPlMr34v4nxsUB800hQIAAAQIECBAg0EZAsG3TCoUQOJnAdZz5bbci/zf+7IM7V/4uvr86WSVOTIAAAQIECBAgQOAEAoLtCVCdkkAzgfyIn/37Zx8q7aOYkK/eOggQIECAAAECBAiMERBsx7RKoQTeWyA/q/aLA3/a3wkHQplGgAABAgQIECDQR8A/Yvv0QiUETiWwf49t3nacn1t7GSMfJuU25FOJOy8BAgQIECBAgMCiAoLtotwuRuAsAhlm84nH3+yC7VmKcFECBAgQIECAAAECpxIQbE8l67wECBAgQIAAAQIECBAgsIiAYLsIs4sQIECAAAECBAgQIECAwKkEBNtTyTovAQIECBAgQIAAAQIECCwiINguwuwiBAgQIECAAAECBAgQIHAqAcH2VLLOS4AAAQIECBAgQIAAAQKLCAi2izC7CAECBAgQIECAAAECBAicSkCwPZWs8xIgQIAAAQIECBAgQIDAIgKC7SLMLkKAAAECBAgQIECAAAECpxIQbE8l67wECBAgQIAAAQIECBAgsIiAYLsIs4sQIECAAAECBAgQIECAwKkEBNtTyTovAQIECBAgQIAAAQIECCwiINguwuwiBAgQIECAAAECBAgQIHAqAcH2VLLOS4AAAQIECBAgQIAAAQKLCAi2izC7CAECBAgQIECAAAECBAicSkCwPZWs8xIgQIAAAQIECBAgQIDAIgKC7SLMLkKAAAECBAgQIECAAAECpxIQbE8l67wECBAgQIAAAQIECBAgsIiAYLsIs4tsSOC33VqfbmjNlkqAAAECBAgQIEDgrAKC7Vn5XXyFArexpicxXsS4XuH6LIkAAQIECBAgQIBAOwHBtl1LFDRc4DLqf71bw1/x9VWM74avSfkECBAgQIAAAQIEWgsItq3bo7ihAldR98sYH+zq9+rt0EYqmwABAgQIECBAYIaAYDujT6qcKZDh9vsY+cpthtufZy5D1QQIECBAgAABAgR6Cwi2vfujuvkC17GEr3bLyO8z4DoIECBAgAABAgQIEDiigGB7REynIvAWgXzl9ipG3pr8TYx8362DAAECBAgQIECAAIEjCQi2R4J0GgIPCDyPP/9pN+fz+HpDjAABAgQIECBAgACB4wgItsdxdBYChwhcxaRvY+R7bvOV2+tDfsgcAgQIECBAgAABAgTeLSDY2iEElhXIMLt/z+1NfP/lLuguW4WrESBAgAABAgQIEFiRgGC7omZayhiBvC05A26+5zZfvc1wmyHXQYAAAQIECBAgQIDAewgItu+B5kcIHEHgwzhHfvzPZ7tz5QOmfjjCeZ2CAAECBAgQIECAwOYEBNvNtdyCmwlcRT35vts8rmP4OKBmDVIOAQIECBAgQIBAfwHBtn+PVLh+gbu3Jv8ey82nJuctyg4CBAgQIECAAAECBA4QEGwPQDKFwAICn8Y18tbkJzFuY+T7bjPkOggQIECAAAECBAgQeEBAsLVFCPQRyPfd3sT4JEa+Ypuv3Aq3ffqjEgIECBAgQIAAgaYCgm3TxihrswIZbq9jfLETyPfc5q8dBAgQIECAAAECBAi8RUCwtTUI9BTIMLv/vFvhtmePVEWAAAECBAgQINBEQLBt0ghlEHiDQH4E0Pe738+g64nJtgkBAgQIECBAgACBNwgItrYFgd4Cl1He612J+XCpDLeemNy7Z6ojQIAAAQIECBBYWECwXRjc5Qi8h0A+Mfkmxgcx8mFS+cTk2/c4jx8hQIAAAQIECBAgsEoBwXaVbbWoFQpkuL2OsX9icr5ym6/gOggQIECAAAECBAhsXkCw3fwWADBI4P4TkzPofhPDrcmDmqhUAgQIECBAgACB4wsItsc3dUYCpxa4jAu8irG/NTk/71a4PbW68xMgQIAAAQIECLQVEGzbtkZhBN4pkLcm563IT2Lk+26FWxuGAAECBAgQIEBgswKC7WZbb+ErEMhbk29i5PtuhdsVNNQSCBAgQIAAAQIE3k9AsH0/Nz9FoIvA3XB7G0XlE5Mz5DoIECBAgAABAgQIbEZAsN1Mqy10xQJ3w22+1zZvSxZuV9xwSyNAgAABAgQIEPj/AoKtHUFgHQIZbvM9t5/tlpMfB3S9jqVZBQECBAgQIECAAIF3Cwi2dgiBdQnk05K/3i0pg20GXAcBAgQIECBAgACBVQsItqtur8VtVOAy1v16t3YPldroJrBsAgQIECBAgMCWBATbLXXbWrckkB8HdBPDZ91uqevWSoAAAQIECBDYqIBgu9HGW/YmBC5ilfm+Wx8HtIl2WyQBAgQIECBAYLsCgu12e2/l2xDIh0rl7chPYlzH8J7bbfTdKgkQIECAAAECmxIQbDfVbovdqMDd25Lzc27zVVwHAQIECBAgQIAAgdUICLaraaWFEHinwPP4059i5Ofcfrz7iowAAQIECBAgQIDAKgQE21W00SIIHCSQr9R+ESO/5iu3DgIECBAgQIAAAQKrEBBsV9FGiyBwkMBFzMr32+aTkt2SfBCZSQQIECBAgAABAhMEBNsJXVIjgeMJvIxTfR/DLcnHM3UmAgQIECBAgACBMwsItmdugMsTOIPATVzzsxj59fMzXN8lCRAgQIAAAQIECBxVQLA9KqeTERghkB8BdBsjb0n+LsbViKoVSYAAAQIECBAgQOAtAoKtrXFugcsoIF89vIjxQwwfRbNMR57FZX7dXcr7bZcxdxUCBAgQIECAAIETCQi2J4J12rcK5Hs888m8eWSYzbE/8n2fH7FbTOAqrvRtjHTPW5LzwVIOAgQIECBAgAABAuMEBNtxLRtd8Kuo/us3rOBF/N7r3e/bk8u2+Dou91WM2xhPdyF32QpcjQABAgQIECBAgMAjBYSIRwL68YMFLmNmPo033995/8h9+Ldge7DlMSdmP25ifLL72uVhUhdRT76a/Pwte+aYBvlKdRr8GMOr1seUdS4CBAgQIECAwEICgu1C0Bu+TAanfC/np+8wyFDxLMa/H5i3YcaTLn0fbvOW5OzDuY68RT33SdZwrjrSIPdjvtf7lxj5awcBAgQIECBAgEBzAcG2eYNWUN51rCFvdf1PjCcPrCdDRN4Oe7uCdVvCYQIZqvOV/Ms3TM9XUK8W2A8ZpvP6+erw/T2a+/ebGALuYf00iwABAgQIECBwFgHB9izsm7ro/hbjfCjUnwesPENEvhfXsW6B/M+ODJI59se/4pubO+McAhdx0We7uvYPOctQex0jX8XNGh0ECBAgQIAAAQLNBATbZg1ZYTl33zub71/M93K+6cjbkPPP8vbPu2FnhSSbXlIG2qsYF3cUMixexrhtJpOvJl/H2AfcfXm5j/POAgcBAgQIECBAgEATAcG2SSNWXMb9h0I92wWb/Oza/bF/Gu8fu3Dz8Yo9trq0+4E2b02/ipGvgna/zfcianwZI/du/ueL94JvdRdbNwECBAgQINBWQLBt25rVFLYPtvm03ZvdqjLIfHBnhft96MnIq2n7/y0k37+aH+W0f3jYPtBer2+pVkSAAAECBAgQIHAuAcH2XPLbuW6+X3b/2bUZZn6I8dud5WfQudj9WrBd177Ij+u52i1JoF1Xb62GAAECBAgQINBKQLBt1Y7VFpPhJkPO/eO/8RvPYtzGyPCb89zmOX8b3H+V9rtYUv4HR/dbjufLWwEBAgQIECBAYKMCgu1GG3+GZV/ENfN9ipcx7t6GfL+UL+M38n2XjpkC+R8U+6da56u0+SCwfNiSgwABAgQIECBAgMDJBATbk9E68VsE8kmzz3aBJ7/uPzc0n4ybgUionbl1sq8/7XqbK8hbzq9ieJV2Zj9VTYAAAQIECBAYJSDYjmqXYgm0FMhbj3+NkeE2by+/9B8ULfukKAIECBAgQIDAagUE29W21sIILCKQITafepxHvuqetx57lXYRehchQIAAAQIECBDYCwi29gIBAu8rkIE2g20eeetxvofaQYAAAQIECBAgQGBxAcF2cXIXJLAKgQy0+1dqX8T316tYlUUQIECAAAECBAiMFBBsR7ZN0QTOKiDUnpXfxQkQIECAAAECBO4LCLb2BAECFYGLmPxbjHxQlFdqK3LmEiBAgAABAgQInExAsD0ZrRMTWKVAPv34WYxfYuSDohwECBAgQIAAAQIEzi4g2J69BQogMEbgMirN99XmR/pcxPD04zGtUygBAgQIECBAYN0Cgu26+2t1BI4p8HOc7IsYbkE+pqpzESBAgAABAgQIPFpAsH00oRMQ2IzAH7HSixgfx7jdzKotlAABAgQIECBAoL2AYNu+RQok0Ebg710l/t5o0xKFECBAgAABAgQIpIB/oNoHBAgcKiDYHiplHgECBAgQIECAwKICgu2i3C5GYLSAYDu6fYonQIAAAQIECKxXQLBdb2+tjMCxBQTbY4s6HwECBAgQIECAwFEEBNujMDoJgU0ICLabaLNFEiBAgAABAgTmCQi283qmYgLnEhBszyXvugQIECBAgAABAu8UEGxtEAIEDhUQbA+VMo8AAQIECBAgQGBRAcF2UW4XIzBa4Peo/pMYT2Pk9w4CBAgQIECAAAECLQQE2xZtUASBEQI3UeVnMT6Pkd87CBAgQIAAAQIECLQQEGxbtEERBEYIXEeVX8V4ESO/dxAgQIAAAQIECBBoISDYtmiDIgiMELiKKr+N8V2M/N5BgAABAgQIECBAoIWAYNuiDYogMELgZVT5fYwfY1yOqFiRBAgQIECAAAECmxAQbDfRZoskcBSBZ3GWX2P8K0Z+7yBAgAABAgQIECDQQkCwbdEGRRAYIfBpVPlbjNsYH4+oWJEECBAgQIAAAQKbEBBsN9FmiyRwNAGfZXs0SiciQIAAAQIECBA4loBgeyxJ5yGwDYF8tfZJjHzFNr93ECBAgAABAgQIEDi7gGB79hYogMAogZuo1mfZjmqZYgkQIECAAAEC6xcQbNffYyskcEyBV3Gyr2N8EyO/dxAgQIAAAQIECBA4u4Bge/YWKIDAKIGrqNZn2Y5qmWIJECBAgAABAusXEGzX32MrJHBMgedxsp9i+MifY6o6FwECBAgQIECAwKMEBNtH8flhApsT2H/kz++x8qebW70FEyBAgAABAgQItBQQbFu2RVEEWgv4yJ/W7VEcAQIECBAgQGB7AoLt9npuxQQeK3AbJ8iP/MlXbPOVWwcBAgQIECBAgACBswoItmfld3ECIwVuour8yJ8vY/w8cgWKJkCAAAECBAgQWJWAYLuqdloMgUUEruIqnoy8CLWLECBAgAABAgQIHCIg2B6iZA4BAncFLuMXr2P8EiOfkuwgQIAAAQIECBAgcFYBwfas/C5OYKTAs6j61xg+8mdk+xRNgAABAgQIEFifgGC7vp5aEYFTC3wYF/gzxl8xPjr1xZyfAAECBAgQIECAwEMCgu1DQv6cAIE3CfjIH/uCAAECBAgQIECgjYBg26YVCiEwSkCwHdUuxRIgQIAAAQIE1i0g2K67v1ZH4FQCgu2pZJ2XAAECBAgQIECgLCDYlsn8AAECISDY2gYECBAgQIAAAQJtBATbNq1QCIFRArdR7ZMYH8fI7x0ECBAgQIAAAQIEziYg2J6N3oUJjBa4juq/ivEiRn7vIECAAAECBAgQIHA2AcH2bPQuTGC0wGVU/zrG7zGejl6J4gkQIECAAAECBMYLCLbjW2gBBM4mkJ9j+8Eu2GbAdRAgQIAAAQIECBA4i4BgexZ2FyWwCoFXsYqvY/wQ4+UqVmQRBAgQIECAAAECIwUE25FtUzSBFgIXUcUfMfKV23yIVH51ECBAgAABAgQIEFhcQLBdnNwFCaxK4OdYzRcxfoxxuaqVWQwBAgQIECBAgMAYAcF2TKsUSqClwIdR1Z+7yvx90rJFiiJAgAABAgQIrF/AP0TX32MrJHBqgb8F21MTOz8BAgQIECBAgMC7BARb+4MAgccKCLaPFfTzBAgQIECAAAECjxIQbB/F54cJEAgBwdY2IECAAAECBAgQOKuAYHtWfhcnsAqB/AzbT2K8iHG9ihVZBAECBAgQIMtDEW0AAA7RSURBVECAwCgBwXZUuxRLoKXAZVT1OkYG3KctK1QUAQIECBAgQIDAqgUE21W31+IILCbgduTFqF2IAAECBAgQIEDgvoBga08QIHAMgXy1No9Pj3Ey5yBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFQHBtqJlLgECBAgQIECAAAECBAi0ExBs27VEQQQIECBAgAABAgQIECBQERBsK1rmEiBAgAABAgQIECBAgEA7AcG2XUsURIAAAQIECBAgQIAAAQIVAcG2omUuAQIECBAgQIAAAQIECLQTEGzbtURBBAgQIECAAAECBAgQIFAREGwrWuYSIECAAAECBAgQIECAQDsBwbZdSxREgAABAgQIECBAgAABAhUBwbaiZS4BAgQIECBAgAABAgQItBMQbNu1REEECBAgQIAAAQIECBAgUBEQbCta5hIgQIAAAQIECBAgQIBAOwHBtl1LFESAAAECBAgQIECAAAECFYH/AZdCUwDXe61PAAAAAElFTkSuQmCC';
    break;
    //3 - error message - should return the message of the error
    case 3:
      response.state = 'error';
      response.message = '<p>Server Timed out. Please check your network connection and try again!</p>';
    break;
  }*/

  if (typeof callback == 'function') {
    callback.call(window, response);
  }
}


function submitAnswer(itemID, answerData, productID) {
	 itemID = itemID.split(/_assignmentId=/);
	  itemID = itemID[0];
	  console.log('submitAnswer itemID:', itemID);
	  console.log('submitAnswer data:', answerData);
	  
		var assignmentId = window.location.href.match(/assignmentId=.+/g)[0].match(/[^=]+/g)[1];
		var currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId);
		var userProfile = window.waggleui.model.getUserProfile();
		var currentClassObject = window.waggleui.model.getCurrentClassObject();
		var subjectId = window.waggleui.model.getSubjectID();
	    var preferenceObj = {
			'studentId': userProfile.studentId,    
			'knewtonId': userProfile.knewtonId,
			'year': userProfile.year,	
			'assignmentId': assignmentId,
			'studentAssignmentId': currentAssignment['info']['studentAssignmentId'],
			'goalId': currentAssignment['info']['goalId'],
			'knewtonGoalId': currentAssignment['info']['knewtonGoalId'],
			'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
			'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId'],
			'itemId': itemID,
			'selected_answers': answerData['selected_answers'],
			'subjectId': subjectId,
			'studentResponse':answerData['studentResponse'],
			'hints_used': answerData['hints_used'],
			'am_code': answerData['am_code'],
			'classId': currentClassObject['classId'],
			'classViewId': currentClassObject['classViewId'],
			'classViewRegId': currentClassObject['classViewRegId'],
			'activeTime': convertSecondsToHMS (itemSessionSecondsCount) // i am itemSessionSecondsCount, coming from global.js
		};
	    
	    window.waggleui.services.submitAnswer(preferenceObj);
	    var currentObject = canvas_controller.get('currentObject');
	    currentObject.showFeedback();
   	 	$('#app_exercise_check').css('display', 'none');
        $('#app_exercise_next').css('display', 'block');
        canvas_controller.set({exerciseSolved: true});
        // unlock all hints
        $('#app_hints_navigator ul li').removeClass('hint_active').addClass('hint_clickable');
   	return;
}

/**
 * Save answer
 * @param itemID @type string - id of the item we save the answer for
 * @param answerData @type object - JSON encoded data
 * @param callback @type function - the function to call after answerData has been processed
 * TBD by: Softcrylic
 */
 
 function saveAnswer(itemID, answerData, productID, callback) {
	  console.log('TBD: check answer and provide feedback - JSON encrypted data');
	  // this returns random response to simulate possible responses
	  // this function will also trigger answer display into the hints / feedback box
	  itemID = itemID.split(/_assignmentId=/);
	  itemID = itemID[0];
	  console.log('saveAnswer itemID:', itemID);
	  console.log('saveAnswer data:', answerData);
	  
	  var assignmentId = window.location.href.match(/assignmentId=.+/g)[0].match(/[^=]+/g)[1];
	  var currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId);
      var userProfile = window.waggleui.model.getUserProfile();
	  var currentClassObject = window.waggleui.model.getCurrentClassObject();
	  var preferenceObj = {
	  		'am_code': answerData['am_code'],
			'answer_type': answerData['answer_type'],
	   		'assignmentId': assignmentId,
	   		'studentId': userProfile.studentId,
	   		'studentAssignmentId': currentAssignment['info']['studentAssignmentId'],
	   		'classViewId': currentClassObject['classViewId'],
	   		'classId': currentClassObject['classId'],
	   		'itemId': itemID,
			'knewtonId': userProfile.knewtonId,
			'hints_used': answerData['hints_used'],
			'studentResponse': answerData['studentResponse']
	  };
	  if(answerData['studentResponseId']){
			preferenceObj['studentResponseId'] = answerData['studentResponseId'];
	  }
	  var response = window.waggleui.services.saveAnswer(preferenceObj);
	  if (typeof callback == 'function') {
	    callback.call(window, response);
	  }
}

/**
  * Get a random id of another exercise
  * @param crt_item_id @type integer - id of the current exercise
  * @returns int
  * TBD by: Softcrylic
  */
function getNextQuestionItem(crt_item_id) {
  console.log('TBD: get next question item data');

  // build a list of all the ids and return a random one, different than the current id
  /*var item_ids = [
    '1', '13', '14',// feeds for exercise code 'choices'
    '3', // feeds for exercise code 'select'
    '4', '7', '11', '101', // feeds for exercise codes 'hot-spot' and 'hs-click'
    '9', // feeds for exercise code 'embed-in-text'
    '15', // feeds for exercise code 'embed-in-image'
    '10', // feeds for exercise code 'drag-drop'
    // feeds for exercise code 'highlight'
    '94', '95', '96', // feeds for exercise code 'segment'
    '16', // feeds for highlight exercise
    '145', '146', '147' // feeds for exercise code 'sort'
  ];*/
  
  
  var item_ids = ['101','102','103','104','105','106','107','108','109','110','111','112','113','114','115'];

  var item_id;
  do {
    item_id = item_ids[Math.floor(Math.random() * item_ids.length)];
  } while(crt_item_id && item_id == crt_item_id);

  return item_id;
}
/**
  * Get list of modules used for the dashboard
  * @param teacherId @type integer - id of the teached we display the modules for. 'All teachers' filter will have teacherId value 0
  * @param page @type integer - current page
  * @returns array - list of JSON encoded modules to be loaded for the current page
  * TBD by: Softcrylic
  */
function getModulesList(teacherId, page) {
  console.log('TBD: Get list of modules used for the dashboard');
  
  if (!page) {
    page = 0;
  }
  if (typeof page != 'number') {
    page = parseInt(page);
  }
  switch (page) {
    case 2:
      return MODULESLISTP2;
    case 3:
      return MODULESLISTP3;
    default:
      return MODULESLIST;
  }
}
/**
  * Get modules pagination
  * @returns JSON encoded pagination data - total number of pages, first index, next index, listed pages, current page
  * TBD by: Softcrylic
  */
function getPagination() {
  console.log('TBD: get pagination object');
}
/**
  * Get current exercise data
  * @param itemID @type integer or string - id of the current requested exercise
  * @returns JSON encoded data for the current question item
  * TBD by: Softcrylic
  */
function getQuestionItem(itemID, productID) {
  console.log('TBD: get current question item data');
	$('#preload').html(''); 
	$('body').removeClass('canvas_ch canvas_hs canvas_sl canvas_dd canvas_srt canvas_mg canvas_ei canvas_et emerald canvas_hl canvas_or');
  return window.waggleui.model.getAmsItem();
  /*var feed_file = null;
  switch (itemID) {
    // feeds for exercise code 'choices'
    case  '1': feed_file = 'feeds/choicesDemo1.js'; break;
    case '13': feed_file = 'feeds/choicesDemo3.js'; break;
    case '14': feed_file = 'feeds/choicesDemo4.js'; break;

    // feeds for exercise code 'select'
    case  '3': feed_file = 'feeds/selectDemo1.js'; break;

    // feeds for exercise codes 'hot-spot' and 'hs-click'
    case  '4': feed_file = 'feeds/hotSpotDemo1.js'; break;
    case  '7': feed_file = 'feeds/hotSpotDemo3.js'; break;
    case '11': feed_file = 'feeds/hotSpotDemo4.js'; break;
    case  '101': feed_file = 'feeds/hotSpotDemo5.js'; break;

    // feeds for exercise code 'embed-in-text'
    case  '9': feed_file = 'feeds/embeddedTextDemo1.js'; break;
      
    // feeds for exercise code 'embed-in-image'
    case  '15': feed_file = 'feeds/embeddedImageDemo1.js'; break;

    // feeds for exercise code 'drag-drop'
    case '10': feed_file = 'feeds/dragDropDemo1.js'; break;

    // feeds for exercise code 'highlight'
    case '16': feed_file = 'feeds/highlightDemo1.js'; break;
    // feeds for exercise code 'segment'
    case '94': feed_file = 'feeds/segmentDemo_line.js'; break;
    case '95': feed_file = 'feeds/segmentDemo_segment.js'; break;
    case '96': feed_file = 'feeds/segmentDemo_point.js'; break;
    // feeds for exercise code 'sort'
    case '145': feed_file = 'feeds/sortDemo_textlabel_imagebin_textobject.js'; break;
    case '146': feed_file = 'feeds/sortDemo_imagelabel_rectbin_eqobject.js'; break;
    case '147': feed_file = 'feeds/sortDemo_eqlabel_rectbin_imagetobject.js'; break;
  }

  return feed_file ? getItemData(feed_file) : {};*/
}




function getCompleteQuestionItem(itemID, productID){
	console.log('TBD: get current complete question item data');
	  return window.waggleui.model.getCompleteAmsItemobject();
}

/**
  * Should return available tools for the current exercise
  * @param itemId @type integer - id of the current exercise we need tools for
  * @returns JSON encoded list of tools
  * TBD by: Softcrylic
  */
function getToolsAvailable(itemId) {
  console.log('TBD: get exercise available tools');

  var tools = {
    "tool": [
      {
        type: "ruler",
        label: "ruler",
        resource: "assets/tools/img470x91-ruler_cm.png"
      },
      /*{
        type: "ruler",
        label: "ruler1",
        resource: "assets/tools/img470x91-ruler_mm.png"
      },
      {
        type: "ruler",
        label: "ruler2",
        resource: "assets/tools/img470x91-ruler_in1.png"
      },
      {
        type: "ruler",
        label: "ruler3",
        resource: "assets/tools/img470x91-ruler_in2.png"
      },
      {
        type: "ruler",
        label: "ruler4",
        resource: "assets/tools/img470x91-ruler_in3.png"
      },
      {
        type: "ruler",
        label: "ruler5",
        resource: "assets/tools/img470x91-ruler_in4.png"
      },
      {
        type: "ruler",
        label: "ruler6",
        resource: "assets/tools/img470x91-ruler_incm.png"
      },*/
      {
        type: "protractor",
        label: "protractor",
        resource: "assets/tools/img414x225-protractor.png"
      },
      {
        type: "calculator",
        label: "calculator"
      },
      {
        type: "scientific",
        label: "scientific"
      }
    ]
  }

  return tools.tool;

}

/**
  * This function should return the currently logged in user's data 
  * @returns JSON encoded user data
  * TBD by: Softcrylic
  */
function getUser() {
  console.log('TBD: get user solving the exercise');
  return {user: {
    id: 123,
    first_name: "John",
    last_name: "Smith",
    avatar: "avatars/3.png"
   }};
}

/**
  * Get list of available teachers
  * @returns array - JSON encoded list of teachers
  * TBD by: Softcrylic
  */
function getTeachersList() {
  console.log('TBD: get list of teachers');
  return TEACHERS;
}

/**
 * Should return a JSON of data for the Alignment Tab
 * @param itemId @type integer - id of the item to be saved
 * @returns a JSON with item data that should be loaded into the top line and the Alignment Tab's
 */
function getAssetDetails(itemId) {
  console.log('TBD: get asset details');
  
  var item = {
    "result": [
      {
        subject: '',
        "asset_id": 123,
        "set_name": "Solving word problems by adding and subtracting fractions with unlike denominators.",
        "comment": "Word problems (or story problems) allow kids to apply what they've learned in math class to real-world situations.  Word problems build higher-order thinking, critical problem-solving, and reasoning skills. ",
        "keywords": [
          "ELA",
          "word problem",
          "strategy",
          "basic",
          "exercise",
          "reading",
          "spelling"
        ]
      }
    ]
  };
  switch (itemId) {
    case '1':
    case '3':
    case '9':
    case '15':
    case 'drag-drop':
    case 'choices':
    case 'select':
    case 'embed-in-text':
    case 'embed-in-image':
    case 'highlight':
    case 'open-response':
      item.subject = 'ELA';
    break;
    case '2':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '94':
    case '95':
    case '96':
    case '144':
    case '145':
    case '146':
    case '147':
    case '101':
    case 'choicesempty': 
    case 'hs-empty':
    case 'hsempty':
    case 'hscempty':
    case 'selectempty':
    case 'hot-spot': 
    case 'hot-spot2':
    case 'hot-spot-fill':
    case 'hs-click':
    case 'segment':
    case 'sort':
      item.subject = 'math';
    break;
  }

  return item;
}
