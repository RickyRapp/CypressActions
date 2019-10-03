import React from "react";
import { BasicCheckbox } from "core/components";
import { defaultTemplate } from "core/utils";

function BasicFieldCheckboxTemplate({ field }) {
    return <BasicCheckbox {...field.bind()} />;
}

export default defaultTemplate(BasicFieldCheckboxTemplate);
