import { Position, Toaster, Intent } from "@blueprintjs/core";

export const SuccessToaster = Toaster.create({
  position: Position.TOP,
  intent: Intent.SUCCESS
});

SuccessToaster.showIntent = options => {
  SuccessToaster.show({ ...options, intent: Intent.SUCCESS, timeout: 2000 });
};

export const ErrorToaster = Toaster.create({
  position: Position.TOP,
  intent: Intent.DANGER
});

ErrorToaster.showIntent = options => {
  SuccessToaster.show({ ...options, intent: Intent.DANGER, timeout: 2000 });
};
