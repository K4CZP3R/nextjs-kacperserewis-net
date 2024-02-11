import { School2, Briefcase, Mail } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Icon({ text }: { text: string }) {
  // Text contains icons and normal text, icons are in format: icon:name;
  // This is regex which will split text where icon items will be icon:name;
  // text: "This is icon:test; and yes."
  // splitText: ["This is ", "icon:test;", " and yes."]

  const splitText = text.split(/(?<=icon:[^;]+;)|(?=icon:[^;]+;)/);

  const style = {
    display: "inline",
    margin: "0 0.125em",
    padding: 0,
    verticalAlign: "baseline",
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "school":
        return <School2 style={style} size={16} />;
      case "work":
        return <Briefcase style={style} size={16} />;
      case "github":
        return <GitHubLogoIcon style={style} />;
      case "mail":
        return <Mail style={style} size={16} />;
      case "linkedin":
        return <LinkedInLogoIcon style={style} />;
      case "stofloos":
        return (
          <img
            width={16}
            height={16}
            style={style}
            src="https://files.stofloosdata.nl/public-data/logo/symbol.svg"
            alt="Stofloos logo"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {splitText.map((item, index) => {
        if (item.startsWith("icon:")) {
          const icon = item.replace("icon:", "").replace(";", "");
          return renderIcon(icon);
        } else {
          return item;
        }
      })}
    </>
  );
}
