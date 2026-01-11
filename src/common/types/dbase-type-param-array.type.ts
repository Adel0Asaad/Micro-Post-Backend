import BasicDataTypes from './basic-data-types';

interface DBaseTypeParamBase {
  key: string;
  arrLen?: number;
  isExpiryDate?: boolean;
}

interface DBaseStringParam extends DBaseTypeParamBase {
  type: 'String';
  numOfBytes: number;
}

interface DBaseNumParam extends DBaseTypeParamBase {
  type: Exclude<BasicDataTypes, 'String'>;
  numOfBytes?: number;
}

type DBaseTypeParamArray = (DBaseStringParam | DBaseNumParam)[];

export default DBaseTypeParamArray;
