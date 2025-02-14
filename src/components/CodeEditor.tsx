import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <div className="h-full w-full">
      <CodeMirror
        value={code}
        height="100%"
        theme={vscodeDark}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        className="text-sm h-full"
      />
    </div>
  );
}