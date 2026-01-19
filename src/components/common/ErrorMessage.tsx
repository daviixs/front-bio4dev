import React from "react";

const ERROR_MESSAGES: Record<string, { title: string; message: string }> = {
  PORTFOLIO_NOT_FOUND: {
    title: "Portfolio não encontrado",
    message: "O portfolio que você procura não existe ou foi removido.",
  },
  PORTFOLIO_NOT_PUBLISHED: {
    title: "Portfolio não publicado",
    message: "Este portfolio ainda não está disponível publicamente.",
  },
  INVALID_PREVIEW_TOKEN: {
    title: "Token inválido",
    message: "O token de preview expirou ou é inválido.",
  },
  API_ERROR: {
    title: "Erro no servidor",
    message: "Ocorreu um erro ao carregar o portfolio. Tente novamente.",
  },
  UNKNOWN_ERROR: {
    title: "Erro desconhecido",
    message:
      "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
  },
};

interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  const errorInfo = ERROR_MESSAGES[error] || ERROR_MESSAGES.API_ERROR;

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        ❌ {errorInfo.title}
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: "2rem" }}>
        {errorInfo.message}
      </p>
      <a
        href="/"
        style={{
          color: "#3b82f6",
          textDecoration: "none",
          fontSize: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #3b82f6",
          borderRadius: "0.5rem",
          transition: "all 0.3s",
        }}
      >
        ← Voltar para página inicial
      </a>
    </div>
  );
}
