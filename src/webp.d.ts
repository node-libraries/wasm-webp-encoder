export declare type ModuleType = {
  encode: (data: BufferSource, width: number, height: number, quality: number) => Uint8Array | null;
};
declare const webp: () => Promise<ModuleType>;
export default webp;
