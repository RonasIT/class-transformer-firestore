import { DocumentReference, Timestamp } from '@google-cloud/firestore';
import { firestore } from 'firebase';
import {
  TransformOperationExecutor
} from 'class-transformer/TransformOperationExecutor';

TransformOperationExecutor.prototype.transform = function (transform) {
  return function (source: any, value: any, targetType: any, arrayType: any, isMap: any, level: any) {
    if (value instanceof DocumentReference || value instanceof firestore.DocumentReference) {
      return value;
    }

    if (value instanceof Timestamp || value instanceof firestore.Timestamp) {
      return value.toDate();
    }

    // @ts-ignore
    // tslint:disable-next-line:no-invalid-this
    return transform.apply(this, [source, value, targetType, arrayType, isMap, level]);
  };
}(TransformOperationExecutor.prototype.transform);
