import { helper } from '@ember/component/helper';

export function shraId([input]) {
  return input.toUpperCase().replace(/[\s-]/g, '_');
}

export default helper(shraId);
