import type {TemplateNames} from '../TemplateNames';
import kebabCase from 'lodash/kebabCase';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

export function composeNames(name: string): TemplateNames {
  const camelName = camelCase(name);
  return {
    name,
    camelCase: camelName,
    snakeCase: snakeCase(name),
    kebabCase: kebabCase(name),
    pascalCase: camelName.charAt(0).toUpperCase() + camelName.substr(1)
  };
}
