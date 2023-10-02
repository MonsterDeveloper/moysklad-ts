import type { MediaType } from "./media-type";
import type { Entity } from "./entity";

export interface Metadata<T extends Entity> {
  href: string;
  metadataHref: string;
  mediaType: MediaType;
  type: T;
  uuidHref?: string;
  downloadHref?: string;
}

export interface UpdateMetadata {
  href: string;
  mediaType: MediaType;
}

export interface ListMetadata<T extends Entity> extends Metadata<T> {
  size: number;
  limit: number;
  offset: number;
  nextHref?: string;
  previousHref?: string;
}

export interface Meta<T extends Entity> {
  meta: Metadata<T>;
}

export interface ListMeta<T extends Entity> {
  meta: ListMetadata<T>;
}

export interface UpdateMeta {
  meta: UpdateMetadata;
}
