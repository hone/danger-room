import { helper } from '@ember/component/helper';

export function isEqual([obj1, obj2]) {
  return obj1 == obj2;
}

export default helper(isEqual);
