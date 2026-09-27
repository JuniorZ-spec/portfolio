export default function ItalicWord({ text, word }: { text: string; word: string }) {
  const i = text.toLowerCase().indexOf(word.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em className="serif-accent">{text.slice(i, i + word.length)}</em>
      {text.slice(i + word.length)}
    </>
  );
}
