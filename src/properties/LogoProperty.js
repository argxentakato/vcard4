import { BaseProperty } from './BaseProperty.js';
import { MissingArgument, InvalidArgument } from '../errors/index.js';
import {
  ValueParameter,
  LanguageParameter,
  PIDParameter,
  PrefParameter,
  IndexParameter,
  TypeParameter,
  MediatypeParameter,
  AltidParameter,
  AnyParameter
} from '../parameters/index.js';
import { URIType } from '../values/index.js';

export class LogoProperty extends BaseProperty {
  static prop = 'LOGO';
  static cardinality = '*';
  static acceptableParamTypes = [
    ValueParameter,
    LanguageParameter,
    PIDParameter,
    PrefParameter,
    IndexParameter,
    TypeParameter,
    MediatypeParameter,
    AltidParameter,
    AnyParameter
  ];
  static acceptableValTypes = URIType;

  #validate(params, value) {
    if (typeof params === 'undefined' || typeof value === 'undefined')
    throw new MissingArgument('Parameters and value for LogoProperty must be supplied');

    else if (!Array.isArray(params))
    throw new InvalidArgument('Parameters for LogoProperty must be passed in an array');

    else if (
      !params.every(
        param => this.constructor.acceptableParamTypes.some(
          acceptableParamType => {
            if (acceptableParamType === TypeParameter)
            return (
              (param instanceof acceptableParamType) &&
              !/^(?:Related|Tel)Property$/i.test(param.targetProp)
            );

            else if (acceptableParamType === ValueParameter)
            return (
              (param instanceof acceptableParamType) &&
              (param.value === 'uri')
            );

            return param instanceof acceptableParamType;
          }
        )
      )
    )
    throw new TypeError('Some of the parameters passed are not valid parameters for LogoProperty');

    else if (!(value instanceof this.constructor.acceptableValTypes))
    throw new TypeError('Invalid type for value of LogoProperty');
  }

  constructor(params, val) {
    super();

    this.#validate(params, val);
    this.params = params.reduce((parametersArray, currentParameter) => {
      parametersArray.push(currentParameter.repr());
      return parametersArray;
    }, []).join(';');
    this.value = val.repr();

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

Object.freeze(LogoProperty);