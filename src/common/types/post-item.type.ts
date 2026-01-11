import {ActiveConstituent} from '@data/models/active-constituent';
import {Customer} from '@data/models/customer';
import {DDInteraction} from '@data/models/dd-interaction';
import {DosageForm} from '@data/models/dosage-form';
import {Drug} from '@data/models/drug';
import {DrugShort} from '@data/models/drug-short';

type PostItem = (
  | ActiveConstituent
  | Customer
  | DDInteraction
  | DosageForm
  | Drug
  | DrugShort
) & {dbItemId: number};

export default PostItem;
