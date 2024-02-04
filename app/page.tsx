// "use client";

// import { Button } from "@/components/ui/button";
// import { generateImg } from "@/lib/fal";
// import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Input } from "@/components/ui/input";

// export default function Home() {
// const [prompt, setPrompt] = React.useState<string>("");
// const [negativePrompt, setNegativePrompt] = React.useState<string>("");
// const [imgSize, setImgSize] = React.useState<string>("");
// const [imageUrl, setImageUrl] = React.useState<string>(""); // Add this line
// const [isLoading, setIsLoading] = React.useState<boolean>(false); // Add this line
//   return (
//     <div>
//       {/* <h1>Generate Image</h1>
//       <input
//         type="text"
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Prompt"
//       />
//       <input
//         type="text"
//         onChange={(e) => setNegativePrompt(e.target.value)}
//         placeholder="Negative Prompt"
//       />
//       <input
//         type="text"
//         onChange={(e) => setImgSize(e.target.value)}
//         placeholder="Image Size"
//       />
// <Button
//   disabled={!prompt || !negativePrompt || !imgSize}
//   onClick={async () => {
//     setIsLoading(true); // Set loading to true when generation starts
//     const url = await generateImg({
//       prompt,
//       negative_prompt: negativePrompt,
//       image_size: imgSize,
//     });
//     setImageUrl(url);
//     setIsLoading(false); // Set loading to false when generation ends
//   }}
// >
//   Generate
// </Button>
//       {imageUrl ? (
//         <img src={imageUrl} alt="Generated" />
//       ) : (
//         isLoading && <Skeleton className="w-64 h-64" />
//       )} */}
//       </div>
//   );
// }
"use client";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { generateImg } from "@/lib/fal";
import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
// export const metadata: Metadata = {
//   title: "Playground",
//   description: "The OpenAI Playground built using the components.",
// };

export default function PlaygroundPage() {
  const [prompt, setPrompt] = React.useState<string>("");
  const [negativePrompt, setNegativePrompt] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>(""); // Add this line
  const [isLoading, setIsLoading] = React.useState<boolean>(false); // Add this line
  return (
    <>
      <div className="flex flex-col space-y-4 p-4">
        <div className="grid h-full gap-6 lg:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-1 flex-col space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="ex: photo of a rhino dressed suit and tie sitting at a table in a bar with a bar stools, award winning photography, Elke vogelsang"
                className="flex-1 lg:min-h-[480px] resize-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="negPrompt">Negative Prompt</Label>
              <Input
                id="negPrompt"
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="ex: cartoon, illustration, animation. face. male, female"
              />
            </div>
          </div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated"
              className="rounded-md border bg-muted lg:min-h-[200px]"
            />
          ) : (
            <div className="mt-[21px] min-h-[200px] rounded-md border bg-muted lg:min-h-[200px]" />
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <Button disabled>Generating...</Button>
          ) : (
            <Button
              disabled={!prompt || !negativePrompt}
              onClick={async () => {
                setIsLoading(true); // Set loading to true when generation starts
                const url = await generateImg({
                  prompt,
                  negative_prompt: negativePrompt,
                });
                setImageUrl(url);
                setIsLoading(false); // Set loading to false when generation ends
              }}
            >
              Generate
            </Button>
          )}
          {imageUrl ? (
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setImageUrl("");
              }}
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}
