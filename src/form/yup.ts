import * as YUP from 'yup';
import moment from 'moment';

YUP.addMethod(YUP.date, 'format', function (formats, parseStrict) {
  return this.transform(function (value, originalValue) {
    if (this.isType(value)) return value;

    value = moment(originalValue, formats, parseStrict);

    return value.isValid() ? value.toDate() : new Date();
  });
});

export {YUP};
