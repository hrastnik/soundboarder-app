import _ from "lodash";

export function intersperse<ArrayType, InterspersedType>(
  array: ArrayType[],
  createElement: (index: number) => InterspersedType
) {
  const newArray = _.castArray(array) as (InterspersedType | ArrayType)[];

  for (let i = 1; i < newArray.length; i += 2) {
    newArray.splice(i, 0, createElement(i));
  }

  return newArray;
}
