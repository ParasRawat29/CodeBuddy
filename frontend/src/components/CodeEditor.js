import { React, memo } from "react";
import AceEditor from "react-ace";

// importing Language for parsing and code highlighting
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";

// Importing themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-terminal";

const LANGUAGES = {
  py: { lang: "python" },
  js: { lang: "javaScript" },
};

function CodeEditor({ handleCodeInput, language, theme, code }) {
  return (
    <>
      <AceEditor
        mode={LANGUAGES[language].lang}
        theme={theme}
        height="90%"
        width="100%"
        fontSize={17}
        focus="true"
        onChange={(e) => handleCodeInput(e)}
        value={code}
      />
    </>
  );
}

export default memo(CodeEditor);
