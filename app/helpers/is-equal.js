import { helper } from '@ember/component/helper';

export default helper(function isEqual([obj1, obj2]) {
  return obj1 === obj2;
});
