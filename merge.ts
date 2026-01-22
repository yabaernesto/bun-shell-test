import { $, file } from "bun";

$.cwd("videos");

const concatVideoFile = file("concat.txt");

await $`rm -f ${concatVideoFile}`;
await $`touch ${concatVideoFile}`;

const videos = await $`ls *.mp4`.text();

const videosToConcat = videos.split("\n").filter(Boolean);

for (const video of videosToConcat) {
  await $`echo "file '${video}'" >> ${concatVideoFile}`;
}

await $`ffmpeg -f concat -safe 0 -i ${concatVideoFile} -c copy output.mp4`;
