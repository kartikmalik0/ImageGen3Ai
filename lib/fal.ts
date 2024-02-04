import * as fal from "@fal-ai/serverless-client";

interface FalResult {
  images: { url: string }[];
}

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function generateImg({
  prompt,
  negative_prompt,
}: {
  prompt: string;
  negative_prompt: string;
}) {
  const result = (await fal.subscribe("fal-ai/fast-sdxl", {
    input: {
      prompt: prompt,
      negative_prompt: negative_prompt,
      image_size: "square_hd",
    },
    pollInterval: 5000,
    logs: true,
    onQueueUpdate(update) {
      console.log("queue update", update);
      return update;
    },
  })) as FalResult;

  const imageUrl = result.images[0].url;
  return imageUrl;
}
