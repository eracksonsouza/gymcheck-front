interface AlertMessageProps {
  type: "error" | "success";
  message: string;
}

export const AlertMessage = ({ type, message }: AlertMessageProps) => {
  const isError = type === "error";

  return (
    <div
      className={`mb-6 rounded-xl border p-4 ${
        isError
          ? "border-red-500/40 bg-red-500/10 text-red-200"
          : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      }`}
    >
      {message}
    </div>
  );
};
