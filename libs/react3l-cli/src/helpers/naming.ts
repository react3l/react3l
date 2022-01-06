import type {TemplateNames} from '../TemplateNames';
import kebabCase from 'lodash/kebabCase';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

export function composeNames(name: string): TemplateNames {
  return {
    name,
    camelCase: camelCase(name),
    snakeCase: snakeCase(name),
    kebabCase: kebabCase(name),
  };
}
