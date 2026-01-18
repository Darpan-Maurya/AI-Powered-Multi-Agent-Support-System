type Props = {
  role: "user" | "agent";
  content: string;
};

export function Message({ role, content }: Props) {
  return (
    <div
      style={{
        textAlign: role === "user" ? "right" : "left",
        margin: "8px 0"
      }}
    >
      <span
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          background: role === "user" ? "#DCF8C6" : "#EEE",
          display: "inline-block",
          maxWidth: "70%"
        }}
      >
        {content}
      </span>
    </div>
  );
}
