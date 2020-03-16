import React from 'react';
import './RichTextEditor.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface RichTextEditorProps {
  value?: string;

  editorConfig?: {
    [key: string]: any;
  };

  onChange?(value: string): void;
}

function RichTextEditor(props: RichTextEditorProps) {
  const {
    value,
    onChange,
    editorConfig,
  } = props;

  const handleChange = React.useCallback(
    (...[, editor]: any) => {
      if (typeof onChange === 'function') {
        onChange(editor.getData());
      }
    },
    [onChange],
  );

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfig}
      data={value}
      onChange={handleChange}
    />
  );
}

export default RichTextEditor;
