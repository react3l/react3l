import Form, { FormProps } from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import { formService } from 'react3l/form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as YUP from 'yup';
import { ObjectSchema } from 'yup';
import { TestClass } from 'react3l/__tests__/models/TestClass';
import { TestUser } from 'react3l/__tests__/models/TestUser';

const {Item: FormItem} = Form;

export default {
  title: 'Form',
};

const sampleClasses: TestClass[] = [
  {
    id: 1,
    code: '1',
    name: 'Class 1',
  },
  {
    id: 2,
    code: '2',
    name: 'Class 2',
  },
];

const formLayout: Partial<FormProps> = {
  labelCol: {span: 4},
  wrapperCol: {span: 14},
};

const preservedNames: string[] = [
  'test',
  'ht',
];

export const useForm = function UseForm() {
  const [translate] = useTranslation();

  const userSchema: ObjectSchema<TestUser> = YUP.object<TestUser>().shape<TestUser>({
    name: YUP
      .string()
      .required(translate('form.name.required'))
      .min(2, translate('form.name.min', {min: 2}))
      .max(30, translate('form.name.max', {max: 2}))
      .test('preserved', translate('form.name.preserved', {names: preservedNames.join(' ')}), function (value: string) {
        return new Promise((resolve) => {
          if (preservedNames.includes(value)) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }),
    email: YUP
      .string()
      .required(translate('form.email.required'))
      .min(2, translate('form.email.min', {min: 2}))
      .max(30, translate('form.email.max', {max: 2})),
    userClassId: YUP.number()
      .required(translate('form.userClass.required')),
  });

  const {
    form,
    dispatch,
    handleFocus,
    handleBlur,
    handleObjectChange,
    errors,
  } = formService.useForm<TestUser>(TestUser, undefined, userSchema);

  const [name, handleChangeName] = formService.useFormField<TestUser, 'name', 'web'>(
    form,
    dispatch,
    'name',
  );

  const [email, handleChangeEmail] = formService.useFormField<TestUser, 'email', 'web'>(
    form,
    dispatch,
    'email',
  );

  const handleChangeClass = React.useCallback(
    (id: number) => {
      const selectedClass: TestClass = sampleClasses.find((sampleClass: TestClass) => sampleClass.id === id);
      handleObjectChange('userClass')(selectedClass);
    },
    [handleObjectChange],
  );

  return (
    <>
      <Form {...formLayout}>
        <FormItem
          label="Name"
          validateStatus={formService.getErrorState<TestUser>(form, errors, 'name')}
          help={formService.getErrorMessage<TestUser>(form, errors, 'name')}
        >
          <Input
            onFocus={handleFocus('name')}
            onBlur={handleBlur('name')}
            value={name}
            onChange={handleChangeName}
          />
        </FormItem>
        <FormItem
          label="Email"
          validateStatus={formService.getErrorState<TestUser>(form, errors, 'email')}
          help={formService.getErrorMessage<TestUser>(form, errors, 'email')}
        >
          <Input
            onFocus={handleFocus('email')}
            onBlur={handleBlur('email')}
            value={email}
            onChange={handleChangeEmail}
          />
        </FormItem>
        <FormItem label="Class">
          <Select
            onFocus={handleFocus('userClassId')}
            onBlur={handleBlur('userClassId')}
            value={form.values.userClassId}
            onChange={handleChangeClass}
          >
            {sampleClasses.map((sampleClass: TestClass) => (
              <Select.Option value={sampleClass.id} key={sampleClass.id}>
                {sampleClass.name}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Form>
    </>
  );
};
