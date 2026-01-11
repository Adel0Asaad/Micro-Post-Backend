interface CreateByteManipulationData {
  offset?: number;
  buffer: string;
  fileName: string;
  overwrite?: boolean;
  append?: boolean;
}

interface QueryByteManipulationData {
  offset?: number;
  length?: number;
  fileName: string;
}

export {CreateByteManipulationData, QueryByteManipulationData};
