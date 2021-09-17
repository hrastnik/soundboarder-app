import { types, Instance, SnapshotOut } from "mobx-state-tree";

export interface MediaInstance extends Instance<typeof Media> {}
export interface MediaSnapshotOut extends SnapshotOut<typeof Media> {}

export const MediaCore = types.model("Media", {
  id: types.maybe(types.string),
  url: types.maybe(types.string),
  title: types.maybeNull(types.string),
  thumb: types.string,
});

export const Media = types.snapshotProcessor(MediaCore, {
  preProcessor(media: string | { id: string; url: string; thumb: string }) {
    if (typeof media === "string") {
      return { id: undefined, url: undefined, title: undefined, thumb: media };
    }
    return media;
  },
  postProcessor(model) {
    return model;
  },
});
