import {CUSTOM_TYPES} from '@data/models/constants';

interface DataCustomData {
  bufferData?: Buffer;
  dataType?: CUSTOM_TYPES;
  dbItemId?: number;
  filePath?: string;
}

export default DataCustomData;
