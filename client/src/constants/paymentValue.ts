import { paymentMethods } from "./paymentMethods";

export const paymentValue = (paymentMethod: string) =>
  paymentMethods.find((method) => method.value === paymentMethod)?.label;
