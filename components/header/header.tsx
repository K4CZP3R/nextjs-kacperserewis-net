import { getSiteName } from "../../lib/get-site-name";

export default function Header() {
  return (
    <div className="pad-1">
      <b>{getSiteName()}</b>
    </div>
  );
}
