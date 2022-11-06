export default function Header({ siteName }: { siteName: string }) {
  return (
    <div className="pad-1">
      <b>{siteName}</b>
    </div>
  );
}
