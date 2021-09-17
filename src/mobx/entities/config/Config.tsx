import { SnapshotOut, SnapshotIn, Instance, types } from "mobx-state-tree";

export interface ConfigInstance extends Instance<typeof Config> {}
export interface ConfigSnapshotIn extends SnapshotIn<typeof Config> {}
export interface ConfigSnapshotOut extends SnapshotOut<typeof Config> {}

export const Config = types.model("Config", {
  maintenance_mode: types.boolean,
  min_password_length: types.number,
  max_upload_size: types.number,
  max_video_length: types.number,

  google_api_key: types.maybeNull(types.string),
  onesignal_app_id: types.maybeNull(types.string),
});
