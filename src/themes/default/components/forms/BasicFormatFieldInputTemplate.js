import React from 'react';
import { renderIf, isSome, defaultTemplate } from 'core/utils';
import NumberFormat from 'react-number-format';

const BasicFormatFieldInputTemplate = defaultTemplate(({ field, t, label = null, ...props }) => {
  const {
    thousandSeparator,
    decimalSeparator,
    format,
    mask,
    prefix,
    suffix,
    decimalScale,
    fixedDecimalScale
  } = props;

  return (
    <div className="inputgroup">
      <label htmlFor={field.id}>{label ? label : t(field.label)} </label>
      <NumberFormat
        className={field.disabled ? "input input--med input--text input--disabled" : "input input--med input--text"}
        onValueChange={({ value }) => field.sync(value)}
        type={field.type}
        value={field.value}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        format={format}
        mask={mask}
        placeholder={field.placeholder}
        disabled={field.disabled}
        prefix={prefix}
        suffix={suffix}
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
      />
      {renderIf(isSome(field.error))(
        <p className="type--tiny type--color--error">{field.error}</p>
      )}
    </div>
  );
});

export default BasicFormatFieldInputTemplate;
