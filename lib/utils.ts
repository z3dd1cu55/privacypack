import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import html2canvas from "html2canvas-pro";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function downloadBlob (blob: Blob) {
    try {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "privacypack.png";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading blob:", error);
    }
  };

function renderPrivacyPackInVirtualDOM() {
  const virtualDiv = document.createElement("div");

  virtualDiv.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 1920px;
    height: 1119px;
    clip-path: polygon(0 0, 0 0, 0 0);
    pointer-events: none;
    background-color: #F5F5F7;
    font-family: 'JetBrains Mono', monospace !important;
  `;

  document.body.appendChild(virtualDiv);

  const originalPrivacyPack = document.getElementById("privacy-pack-result-to-capture");

  if (originalPrivacyPack) {
    const clonedPrivacyPack = originalPrivacyPack.cloneNode(true) as HTMLElement;

    virtualDiv.appendChild(clonedPrivacyPack);

    clonedPrivacyPack.style.cssText = `
      display: block !important;
      position: static !important;
      transform: none !important;
      width: 1920px !important;
      height: 1119px !important;
      margin: 0 !important;
      padding: 16px !important;
      background-color: #F5F5F7 !important;
      font-family: 'JetBrains Mono', monospace !important;
    `;
  }

  return virtualDiv;
};

export async function handleShare() {
  const virtualDiv = renderPrivacyPackInVirtualDOM();

  // Make it briefly visible for capture
  virtualDiv.style.visibility = "visible";

  requestAnimationFrame(async () => {
    try {
      const canvas = await html2canvas(virtualDiv, {
        backgroundColor: "#000",
        width: 423,
        height: 752,
        scale: 2,
        logging: true,
        onclone: (clonedDoc) => {
          const clonedDiv = clonedDoc.querySelector(
            ".share-card-to-capture",
          ) as HTMLElement;
          if (clonedDiv) {
            clonedDiv.style.cssText = `
              width: 1920px !important;
              height: 1119px !important;
              display: block !important;
              visibility: visible !important;
              position: static !important;
              transform: none !important;
              transform-origin: 0 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              font-family: 'JetBrains Mono', monospace !important;
            `;
          }
        },
      });

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const file = new File([blob], "privacypack.png", {
              type: "image/png",
            });

            // If Web Share API is supported
            if (
              navigator.canShare &&
              navigator.canShare({
                text: "",
                url: "https://privacypack.org",
                files: [file],
              })
            ) {
              try {
                await navigator.share({
                  text: "",
                  url: "https://privacypack.org",
                  files: [file],
                });
                console.log("Image shared successfully!");
              } catch (error) {
                console.error("Error sharing image:", error);
                downloadBlob(blob);
              }
            } else {
              // Fallback for downloading if sharing isn't supported
              downloadBlob(blob);
            }
          }
        },
        "image/png",
        1.0,
      );
    } catch (error) {
      console.error("Error capturing the div:", error);
    } finally {
      // Hide and remove the virtual div
      virtualDiv.style.visibility = "hidden";
      document.body.removeChild(virtualDiv);
    }
  });
};

export async function handleDownload() {
  const virtualDiv = renderPrivacyPackInVirtualDOM();

  // Make it briefly visible for capture
  virtualDiv.style.visibility = "visible";

  requestAnimationFrame(async () => {
    try {
      const canvas = await html2canvas(virtualDiv, {
        backgroundColor: "#F5F5F7",
        width: 1920,
        height: 1119,
        scale: 2,
        logging: true,
        onclone: (clonedDoc) => {
          const clonedDiv = clonedDoc.querySelector(
            ".share-card-to-capture",
          ) as HTMLElement;
          if (clonedDiv) {
            clonedDiv.style.cssText = `
              width: 1920px !important;
              height: 1119px !important;
              display: block !important;
              visibility: visible !important;
              position: static !important;
              transform: none !important;
              transform-origin: 0 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              font-family: 'JetBrains Mono', monospace !important;
            `;
          }
        },
      });

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            downloadBlob(blob);
          }
        },
        "image/png",
        1.0,
      );
    } catch (error) {
      console.error("Error capturing the div:", error);
    } finally {
      // Hide and remove the virtual div
      virtualDiv.style.visibility = "hidden";
      document.body.removeChild(virtualDiv);
    }
  });
};