/** react */
import { useState, useRef, ChangeEvent } from "react";

/** components */
import Spinner from "@/components/Sppiner";

/** services */
import { callLLM } from "@/services/llmService";

/** icons */
import { PaperPlaneRight } from "@phosphor-icons/react";

/** styles */
import styles from "./styles.module.scss";
////////////////////////////////////////////////////////////////////////////////

const commands = [
  {
    label: "Escrever Código",
    value: "Escreva um código em Python que faça o seguinte:\n",
  },
  { label: "Refatorar Código", value: "Refatore o seguinte código Python:\n" },
  {
    label: "Corrigir Erros",
    value: "Corrija os erros no seguinte código Python:\n",
  },
  {
    label: "Explicar Código",
    value: "Explique o que o seguinte código Python faz:\n",
  },
  {
    label: "Gerar Docstrings",
    value: "Adicione docstrings ao seguinte código Python:\n",
  },
  {
    label: "Criar Testes Unitários",
    value: "Crie testes unitários para o seguinte código Python:\n",
  },
];

const LLMForm = ({ editorRef }: { editorRef: any }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState(commands);
  const [caretPosition, setCaretPosition] = useState(0);
  const [selectedCommand, setSelectedCommand] = useState<{
    label: string;
    value: string;
  } | null>(null); 
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPosition = e.target.selectionStart;
    setPrompt(value);
    setCaretPosition(cursorPosition);

    const textBeforeCursor = value.substring(0, cursorPosition);
    const lastWord = textBeforeCursor.split(" ").pop();

    if (lastWord && lastWord.startsWith("/")) {
      const query = lastWord.substring(1).toLowerCase();
      const filtered = commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(query)
      );
      setFilteredCommands(filtered);
      setShowCommands(true);
    } else {
      setShowCommands(false);
    }
  };

  const handleCommandSelect = (command: { label: string; value: string }) => {
    const textBeforeCursor = prompt.substring(0, caretPosition);
    const textAfterCursor = prompt.substring(caretPosition);

    const lastWordStart = textBeforeCursor.lastIndexOf("/");
    const newTextBeforeCursor =
      textBeforeCursor.substring(0, lastWordStart) + command.label;

    const newPrompt = newTextBeforeCursor + textAfterCursor;
    setPrompt(newPrompt);
    setSelectedCommand(command);
    setShowCommands(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          newTextBeforeCursor.length;
      }
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalPrompt = prompt;
    const code = editorRef.current.getValue();

    if (selectedCommand) {
      finalPrompt = `${selectedCommand.value}${prompt}\n${code}`;
    } else {
      finalPrompt = `${prompt}\n${code}`;
    }

    const result = await callLLM(finalPrompt);
    editorRef.current.setValue(result);
    setLoading(false);
  };

  return (
    <>
      {loading && <Spinner />}
      <div className={styles.container}>
        {showCommands && (
          <ul>
            {filteredCommands.map((command, index) => (
              <li
                key={index}
                onClick={() => handleCommandSelect(command)}
                style={{ padding: "5px", cursor: "pointer" }}
              >
                {command.label}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.form}>
          <textarea
            ref={inputRef}
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Digite o prompt aqui ou pressione / para ver os comandos"
            rows={3}
          />
          <button disabled={loading} onClick={handleSubmit}>
            <PaperPlaneRight size={24} color="white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default LLMForm;
