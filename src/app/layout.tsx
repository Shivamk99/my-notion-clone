import {Inter} from "next/font/google";
import type {Metadata} from "next";

import {Toaster} from "sonner";

import {ThemeProvider} from "@/src/components/providers/theme/theme-provider";
import CovexClientProvider from "@/src/components/providers/convex/convex-providers";

import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Notion",
  description: "Your connected workspace for wiki, docs & projects.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CovexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="notion-theme"
          >
            <Toaster position={"bottom-center"} />
            {children}
          </ThemeProvider>
        </CovexClientProvider>
      </body>
    </html>
  );
}
