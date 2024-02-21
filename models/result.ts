// Internals of the Result module
const TAG = Symbol("tag");
const VAL = Symbol("val");
const ERR = Symbol("err");

type Tag = "Ok" | "Err";

type Base<V, E> = {
  [TAG]: Tag;
  [VAL]?: V;
  [ERR]?: E;
};

export type Result<V, E> = {
  readonly [TAG]: Tag;
  readonly [VAL]?: V;
  readonly [ERR]?: E;
  isOk: () => boolean;
  isErr: () => boolean;
  unwrap: () => V;
  unwrapErr: () => E;
  unwrapOrNull: () => V | null;
  unwrapOrEmpty: () => V | [];
};

const make = <V, E>(t: Base<V, E>): Result<V, E> => {
  return {
    [TAG]: t[TAG],
    [VAL]: t[VAL],
    [ERR]: t[ERR],
    isOk: () => t[TAG] == "Ok",
    isErr: () => t[TAG] == "Err",
    unwrap: () => {
      if (t[TAG] == "Ok") return t[VAL] as V;
      throw new Error("Tried to unwrap an Err");
    },
    unwrapErr: () => {
      if (t[TAG] == "Err") return t[ERR] as E;
      throw new Error("Tried to unwrapErr an Ok");
    },
    unwrapOrNull: () => {
      if (t[TAG] == "Ok") return t[VAL] as V;
      return null;
    },
    unwrapOrEmpty: () => {
      if (t[TAG] == "Ok") return t[VAL] as V;
      return [];
    },
  };
};

// Public API of the Result module
export const ok = <V, E>(val: V): Result<V, E> =>
  make({ [TAG]: "Ok", [VAL]: val });
export const err = <V, E>(err: E): Result<V, E> =>
  make({ [TAG]: "Err", [ERR]: err });
