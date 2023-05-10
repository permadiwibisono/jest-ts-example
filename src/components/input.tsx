import { useState } from "react";

export function Input() {
  const [text, setText] = useState<string>("");
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" type="text" value={text} onChange={handleChange} />
    </div>
  );
}
