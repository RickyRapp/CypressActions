import React from "react";
import { BasicCheckbox } from "core/components";
import { defaultTemplate } from "core/utils";

function BasicQueryCheckboxTemplate({
    id,
    queryUtility,
    propertyName,
    label,
    onChange,
    checked
}) {
    const handleChange =
        onChange || (e => queryUtility.filter.toggle(propertyName));
    const value = checked || !!queryUtility.filter[propertyName];
    return (
        <BasicCheckbox
            type="checkbox"
            id={id}
            onChange={handleChange}
            checked={value}
            label={label}
        />
    );
}

export default defaultTemplate(BasicQueryCheckboxTemplate);
