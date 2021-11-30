/* eslint-disable no-unused-vars */
import { initWorker } from 'worker-lib';
import webp, { ModuleType } from './webp.js';

let webpModule: ModuleType;

const getModule = async () => {
  if (!webpModule) webpModule = await webp();
  return webpModule;
};
const encode = async (
  data: BufferSource,
  width: number,
  height: number,
  quality: number
): Promise<Uint8Array | null> => {
  return (await getModule()).encode(data, width, height, quality);
};

// Initialization process to make it usable in Worker.
const map = initWorker({ encode });
// Export only the type
export type WorkerWebp = typeof map;
