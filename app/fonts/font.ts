import { Fira_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: ["400", "600"] });

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  fallback: ["system-ui", "arial"],
});

const uiSans = localFont({
  src: [
    {
      path: "../fonts/ui-sans-v9-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ui-sans-v9-medium.woff2",
      weight: "500",
      style: "normal",
    },
    { path: "../fonts/ui-sans-v9-bold.woff2", weight: "600", style: "normal" },
  ],
});
export { firaSans, inter, uiSans };
