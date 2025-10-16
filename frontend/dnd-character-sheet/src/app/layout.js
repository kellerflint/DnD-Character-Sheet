import "./globals.css";
import AuthForms from "@/components/AuthForms";

export const metadata = {
  title: "Dungeons and Dragons Character Sheet App",
  description: "This app is designed to save your in-game character sheets' information for later play.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h1>Dungeons and Dragons Character Sheet</h1>
        <AuthForms />
        {children}
      </body>
    </html>
  );
}
