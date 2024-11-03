import { Toaster } from "@/components/ui/sonner";
import Provider from "@/provider";
import {
  jost,
  libreBaskerville,
  lobster,
  mangericaRegular,
  playfairDisplay,
  poppins,
  prata,
  quickSand,
  roboto,
  serifDisplay,
  spaceGrotes,
} from "@/utils/font";
import "@/app/globals.css";
import React from "react";
import Script from "next/script";

// export const metadata: Metadata = {
//   title: "Formix",
//   description: "Tailored for Developers, Designed for Everyone",
//   icons: ["favicon/favicon.ico", "favicon/favicon-32x32.png"],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
    gtag('config', 'G-P074ZMDP1G');

        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-P074ZMDP1G`}
      />

      <Script strategy="lazyOnload" id="clarity-script">
        {`
         (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "oikkdb86ef");
      `}
      </Script>
      <body>
        <main
          className={`    
               ${mangericaRegular.variable} ${jost.variable} ${poppins.variable}
              ${serifDisplay.variable} ${quickSand.variable} ${libreBaskerville.variable} ${spaceGrotes.variable} ${prata.variable}
              ${lobster.variable} ${playfairDisplay.variable} ${roboto.variable}`}
        >
          <Provider>
            {children}
            <Toaster toastOptions={{}} richColors />
          </Provider>
        </main>
      </body>
    </html>
  );
}
