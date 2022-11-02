import { IntegerType } from './IntegerType.js';

declare class IntegerListType {
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: (string | number | bigint)[];
  repr(): string;
  reprXML(): string;
  reprJSON(): (string | number | bigint)[];
  constructor(integerlist: IntegerType[]);
}

export { IntegerListType };
