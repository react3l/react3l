// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React from 'reactn';
import {i18nextConfig, initialGlobalState} from 'core/config';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

export async function configTests(): Promise<any> {
  await Promise.all([
    React.setGlobal(initialGlobalState),
    i18next
      .use(initReactI18next)
      .init(i18nextConfig),
  ]);
}
