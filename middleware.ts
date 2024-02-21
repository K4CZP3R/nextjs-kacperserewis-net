import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";

export default createMiddleware({
  defaultLocale: "nl",
  localePrefix,
  locales,
});
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pl|nl|en)/:path*"],
};
