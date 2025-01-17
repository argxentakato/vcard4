import { ValueParameter } from '../parameters/ValueParameter.js';
import { PrefParameter } from '../parameters/PrefParameter.js';
import { AltidParameter } from '../parameters/AltidParameter.js';
import { PIDParameter } from '../parameters/PIDParameter.js';
import { TypeParameter } from '../parameters/TypeParameter.js';
import { MediatypeParameter } from '../parameters/MediatypeParameter.js';
import { AnyParameter } from '../parameters/AnyParameter.js';
import { IndexParameter } from '../parameters/IndexParameter.js';
import { URIType } from '../values/URIType.js';
import '../values/TextType.js';
import '../values/TextListType.js';
import '../values/BooleanType.js';
import '../values/DateTimeType.js';
import '../values/DateTimeListType.js';
import '../values/IntegerType.js';
import '../values/IntegerListType.js';
import '../values/FloatType.js';
import '../values/FloatListType.js';
import '../values/LanguageTagType.js';
import '../values/SexType.js';
import '../values/SpecialValueType.js';

declare class URLProperty {
  readonly params: string;
  readonly paramsXML: string;
  readonly paramsJSON: {};
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: {}[];
  repr(): string;
  reprXML(): string;
  reprJSON(): {}[];
  constructor(
    params: (
      | ValueParameter
      | PrefParameter
      | AltidParameter
      | PIDParameter
      | TypeParameter
      | MediatypeParameter
      | AnyParameter
      | IndexParameter
    )[],
    val: URIType
  );
}

export { URLProperty };
