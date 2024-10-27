/** react */
import { useRef } from "react";

/** external libs */
import MonacoEditor from "@monaco-editor/react";

/** components */
import LLMForm from "@/components/LLMForm";
///////////////////////////////////////////////////////////////////////////////


const Home = () => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <>
      <MonacoEditor
        height="100vh"
        defaultLanguage="python"
        defaultValue="# Escreva seu código Python aqui"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
      <LLMForm editorRef={editorRef} />
    </>
  );
};

export default Home;
