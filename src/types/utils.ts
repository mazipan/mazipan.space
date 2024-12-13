/**
 * Use only for components.
 * Unused, use ComponentProps<typeof SomeComponent> instead.
 */
export type InferProps<T> = T extends (props: infer P) => JSX.Element ? P : never;

/**
 * Extracts the union type of values from a constant object.
 */
export type ValueUnion<T extends Record<PropertyKey, unknown>> = T[keyof T];
