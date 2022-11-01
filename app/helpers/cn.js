import { helper } from '@ember/component/helper';

export default helper(function cn(classNames) {
  return classNames.join(' ');
});
