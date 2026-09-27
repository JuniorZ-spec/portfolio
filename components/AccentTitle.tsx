export default function AccentTitle({ text }: { text: string }) {
  const words = text.trim().split(' ');
  const last = words.pop();
  if (!words.length) return <>{text}</>;
  return (
    <>
      {words.join(' ')} <em className="serif-accent">{last}</em>
    </>
  );
}
