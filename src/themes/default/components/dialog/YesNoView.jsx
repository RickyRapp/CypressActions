import React from "react";
import { defaultTemplate } from "core/utils";
import { BaasicButton } from 'core/components';

function YesNoViewTemplate({
  message,
  onConfirm,
  onCancel,
  yesLabel = "MODAL.YES_NO_CONFIRM_LABEL",
  noLabel = "MODAL.YES_NO_CANCEL_LABEL",
  t,
  loading,
  ...other
}) {
  return (
    <div>
      <span className="type--base w--500--max w--100 padd--right--med spc--top--med">
        {t(message)}
      </span>
      <div className="spc--top--med">
        <BaasicButton
          className="btn btn--med btn--primary spc--right--sml display--ib"
          onClick={onConfirm}
          disabled={loading}
          rotate
          icon={
            loading
              ? "synchronize-arrows-1 rotate"
              : ""
          }
          label={t(yesLabel)}
        />
        <BaasicButton
          className="btn btn--med btn--ghost"
          onClick={onCancel}
          disabled={loading}
          label={t(noLabel)}
        />
      </div>
    </div>
  );
}

export default defaultTemplate(YesNoViewTemplate);
