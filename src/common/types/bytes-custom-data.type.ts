import {CUSTOM_TYPES} from '@data/models/constants';

interface BytesCustomData {
  bufferData?: Buffer;
  dataType?: CUSTOM_TYPES;
  dbItemId?: number;
  filePath?: string;
  fileExists?: boolean;
}

export default BytesCustomData;
