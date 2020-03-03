import {ColumnWidths, LanguageKeys} from 'react3l';
import {translate} from 'core/helpers/internationalization';

export const generalColumnWidths: ColumnWidths = {
  index: 50,
  checkbox: 50,
  expand: 50,
  actions: 120,
};

export const generalLanguageKeys: LanguageKeys = {
  actions: {
    label: translate('general.actions.label'),
    create: translate('general.actions.create'),
    close: translate('general.actions.close'),
    add: translate('general.actions.add'),
    update: translate('general.actions.update'),
    delete: translate('general.actions.delete'),
    search: translate('general.actions.search'),
    filter: translate('general.actions.filter'),
    import: translate('general.actions.import'),
    export: translate('general.actions.export'),
    reset: translate('general.actions.reset'),
    save: translate('general.actions.save'),
  },
  columns: {
    index: translate('general.columns.index'),
  },
  delete: {
    title: translate('general.delete.title'),
    content: translate('general.delete.content'),
  },
  batchDelete: {
    title: translate('general.batchDelete.title'),
    content: translate('general.batchDelete.content'),
  },
};
