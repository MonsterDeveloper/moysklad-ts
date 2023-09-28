import type { Entity } from "./entity";

export interface Metadata<T extends Entity> {
  href: string;
  type: T;
}

export interface ListMetadata<T extends Entity> extends Metadata<T> {
  size: number;
  limit: number;
  offset: number;
}

export interface Meta<T extends Entity> {
  meta: Metadata<T>;
}

export interface ListMeta<T extends Entity> {
  meta: ListMetadata<T>;
}
