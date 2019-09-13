import { Position, Toaster, Intent } from "@blueprintjs/core";

export const SuccessToaster = Toaster.create({
  position: Position.TOP,
  intent: Intent.SUCCESS
});

export const ErrorToaster = Toaster.create({
  position: Position.TOP,
  intent: Intent.DANGER
});
