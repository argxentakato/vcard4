import { AbstractBaseValue } from './AbstractBaseValue.js';
import { MissingArgument } from '../errors/index.js';

export class FloatListType extends AbstractBaseValue {
  static type = 'FLOAT';

  #validate(floatlist) {
    if (typeof floatlist === 'undefined')
    throw new MissingArgument('Value for FloatListType must be supplied');

    else if (!Array.isArray(floatlist))
    throw new TypeError('Invalid type for value of FloatListType. It should be an array of FloatTypes');

    else if (
      !floatlist.every(
        float => float instanceof FloatType
      )
    )
    throw new TypeError('Invalid type for value of FloatListType. It should be an array of FloatTypes');
  }

  constructor(floatlist) {
    super();

    this.#validate(floatlist);
    this.value = floatlist.reduce((accumulatedFloatTypes, currentFloatType) => {
      accumulatedFloatTypes.push(currentFloatType.repr());
      return accumulatedFloatTypes;
    }, []).join(',');

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}
