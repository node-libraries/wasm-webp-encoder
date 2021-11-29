/* eslint-disable no-unused-vars */
import { createWorker } from 'worker-lib';
import type { WorkerWebp } from './worker';

const execute = createWorker<WorkerWebp>(
  () => new Worker(new URL('./worker', import.meta.url)),
  5 // Maximum parallel number
);

export const encode: {
  (data: BufferSource, width: number, height: number, quality?: number): Promise<Uint8Array | null>;
  (data: ImageData, quality?: number): Promise<Uint8Array | null>;
} = async (data: BufferSource | ImageData, a?: number, b?: number, c?: number) => {
  return data instanceof ImageData
    ? execute('encode', data.data, data.width, data.height, a || 100)
    : execute('encode', data, a as number, b as number, c || 100);
};
