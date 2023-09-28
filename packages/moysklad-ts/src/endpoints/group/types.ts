import type { Entity, Idable, Meta, Payload } from "@/types";
import type { EmptyObject } from "type-fest";

export interface Group extends Idable, Meta<Entity.Group> {
  readonly accountId: string;
  index?: number;
  name: string;
}

export interface GroupPayload extends Payload {
  object: Group;
  expandable: EmptyObject;
}
