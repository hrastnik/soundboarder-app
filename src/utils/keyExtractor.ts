export const keyExtractor = (entity: { id: number | string }) =>
  entity.id.toString();
