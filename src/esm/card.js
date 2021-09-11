import {
  MissingArgument,
  InvalidArgument
} from './errors.js';

import {
  TextType,
  TextListType,
  BooleanType,
  DateTimeType,
  IntegerType,
  FloatType,
  LanguageTagType,
  URIType,
  SexType,
  SpecialValueType
} from './values.js';

import {
  LanguageParameter,
  ValueParameter,
  PrefParameter,
  AltidParameter,
  PIDParameter,
  TypeParameter,
  MediatypeParameter,
  CalscaleParameter,
  SortAsParameter,
  GeoParameter,
  TzParameter,
  AnyParameter,
  LabelParameter
} from './parameters.js';

import {
  BeginProperty,
  EndProperty,
  SourceProperty,
  KindProperty,
  XMLProperty,
  FNProperty,
  NProperty,
  NicknameProperty,
  PhotoProperty,
  BdayProperty,
  AnniversaryProperty,
  GenderProperty,
  AdrProperty,
  TelProperty,
  EmailProperty,
  IMPPProperty,
  LangProperty,
  TzProperty,
  GeoProperty,
  TitleProperty,
  RoleProperty,
  LogoProperty,
  OrgProperty,
  MemberProperty,
  RelatedProperty,
  CategoriesProperty,
  NoteProperty,
  ProdidProperty,
  RevProperty,
  SoundProperty,
  UIDProperty,
  ClientpidmapProperty,
  URLProperty,
  VersionProperty,
  KeyProperty,
  FburlProperty,
  CaladruriProperty,
  CaluriProperty,
  ExtendedProperty
} from './properties.js';

class VCARD {
  static cardinalityOneProps = [
    BeginProperty,
    EndProperty,
    VersionProperty
  ];

  static cardinalityOneOrMoreProps = FNProperty;

  static cardinalityNoneOrOneProps = [
    AnniversaryProperty,
    BdayProperty,
    GenderProperty,
    KindProperty,
    NProperty,
    ProdidProperty,
    RevProperty,
    UIDProperty
  ];

  static cardinalityNoLimitProps = [
    AdrProperty,
    CaladruriProperty,
    CaluriProperty,
    CategoriesProperty,
    ClientpidmapProperty,
    EmailProperty,
    ExtendedProperty,
    FburlProperty,
    GeoProperty,
    IMPPProperty,
    KeyProperty,
    LangProperty,
    LogoProperty,
    MemberProperty,
    NicknameProperty,
    NoteProperty,
    OrgProperty,
    PhotoProperty,
    RelatedProperty,
    RoleProperty,
    SoundProperty,
    SourceProperty,
    TelProperty,
    TitleProperty,
    TzProperty,
    URLProperty,
    XMLProperty
  ];

  repr() {
    return this.value;
  }

  #assemble() {
    const CRLF = '\r\n';

    this.value = '';
    this.value += new BeginProperty().repr() + CRLF;
    this.value += new VersionProperty().repr() + CRLF;

    this.value += this.props.reduce((accumulatedProps, currentProp) => {
      accumulatedProps.push(currentProp.repr());
      return accumulatedProps;
    }, []).join(CRLF) + CRLF;

    this.value += new EndProperty().repr() + CRLF;
  }

  #validate(props) {
    if (typeof props === 'undefined')
    throw new MissingArgument('Properties for VCARD must be supplied');

    else if (!Array.isArray(props))
    throw new InvalidArgument('Properties for VCARD must be passed in an array');

    else if (
      this.constructor.cardinalityOneProps.every(
        cardOneProp => props.some(prop => prop.constructor === cardOneProp)
      )
    )
    throw new InvalidArgument('BeginProperty, VersionProperty and EndProperty instances must not be supplied');

    else if (
      !props.some(prop => prop.constructor === this.constructor.cardinalityOneOrMoreProps)
    )
    throw new MissingArgument('One or more FNProperty instances must be supplied');

    else if (
      !this.constructor.cardinalityNoneOrOneProps.every(cardNoneOrOneProp => {
        let count = 0;
        for (let index = 0; index < props.length; index++)
        if (props[index].constructor === cardNoneOrOneProp)
        count++;
        return count <= 1;
      })
    )
    throw new InvalidArgument('AnniversaryProperty, BdayProperty, GenderProperty, KindProperty, NProperty, ProdidProperty, RevProperty and UIDProperty must not have more than one instance supplied');
  }

  constructor(props) {
    this.#validate(props);
    this.props = props;
    this.#assemble();

    Object.freeze(this);
  }
}

export default VCARD;
