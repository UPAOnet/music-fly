/**
  * Attribute Directive to autofocus inputs
  * Works whenever mf-auto-focus is set to "true"
  */

export const autoFocus = function (
  $timeout
) {
  'ngInject';
  return  {
    restrict: 'A',
    link: function (scope, element, attr) {
      attr.$observe('mfAutoFocus', function (newValue) {
        if (newValue === 'true') {
          element[0].focus();
        }
      });
    }
  };
};
