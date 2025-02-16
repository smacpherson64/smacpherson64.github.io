import { Component, type ReactNode } from "react";
import {
  Type as TypeBoxTypes,
  FormatRegistry,
  TSchema,
  Kind,
  TypeRegistry,
} from "@sinclair/typebox";
import { Value, type ValueErrorIterator } from "@sinclair/typebox/value";
import { parseISO, isValid } from "date-fns";

const ReactNodeType = TypeBoxTypes.Unsafe<ReactNode>({ [Kind]: "ReactNode" });

TypeRegistry.Set(
  "ReactNode",
  (_: unknown, value: unknown) =>
    !!(
      value === null ||
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "function" ||
      (value && value instanceof Component)
    )
);

FormatRegistry.Set("date", (value) => {
  if (typeof value !== "string") return false;
  if (value.length !== 10) {
    // Expecting a 10 number value like: ####-##-##, but got more might be a date-time.
    if (value.length > 10) {
      console.warn(
        `Received ${value} for date, did you mean to use date-time?`
      );
    }
    return false;
  }

  return isValid(parseISO(value));
});

FormatRegistry.Set("date-time", (value) => {
  if (typeof value !== "string") return false;

  // Received a 10 number value, might be a date: ####-##-##
  if (value.length === 10) {
    console.warn(`Received ${value} for date-time, did you mean to use date?`);
    return false;
  }

  return isValid(parseISO(value));
});

////////////////////////////////
// #region . Exports
////////////////////////////////

export const Type = Object.assign({}, TypeBoxTypes, {
  ReactNode: ReactNodeType,
});

export class PropsError extends Error {
  constructor(input: { componentName: string; errors: ValueErrorIterator }) {
    const $errors = Array.from(input.errors);

    const errorMessages = $errors.map(($error) => {
      switch ($error.type) {
        case 45:
          return `- ${$error.path.slice(1)} is required`;
        default:
          return `- ${$error.path.slice(1)} ${
            $error.schema?.errorMessage ?? $error.message
          }`;
      }
    });

    super(
      `${input.componentName} had unexpected props: \n\n${errorMessages.join(
        "\n"
      )}\n\n${JSON.stringify($errors)}`
    );
  }
}

export function verify<T extends TSchema>(
  component: unknown,
  Type: T,
  props: unknown
): void {
  if (!Value.Check(Type, props)) {
    console.error(
      new PropsError({
        componentName: component?.name ?? "",
        errors: Value.Errors(Type, props),
      })
    );
  }
}
