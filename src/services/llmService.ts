import api from "@/utils/api";

export const callLLM = async (prompt: string) => {
  const response = await api.post("/completions", {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a Python developer.",
      },
      {
        role: "user",
        content: prompt + "\n" + "Escreva o codigo completo e retorne apenas o codigo. Sem introdução, sem explicação, apenas o código. Retorne o código completo sem formatação.",
      },
    ],
    max_tokens: 150,
  });
  return response.data.choices[0].message.content;
};
