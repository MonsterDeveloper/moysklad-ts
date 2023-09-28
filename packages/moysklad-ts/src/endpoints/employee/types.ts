import type { DateTime, Entity, Idable, Meta, Payload } from "@/types";

export interface Employee extends Idable, Meta<Entity.Employee> {
  readonly accountId: string;
  archived: boolean;
  // TODO add attributes
  attributes?: unknown;
  // TODO expand cashiers
  readonly cashiers?: unknown;
  code?: string;
  readonly created?: DateTime;
  description?: string;
  email?: string;
  externalCode: string;
  firstName?: string;
  readonly fullName?: string;
  // TODO expand group
  group: unknown;
  // TODO add image
  image?: unknown;
  inn?: string;
  lastName: string;
  middleName?: string;
  name: string;
  owner: Employee;
  phone?: string;
  position?: string;
  shared: boolean;
  readonly shortFio?: string;
  readonly uid?: string;
  readonly updated: DateTime;
}

export interface EmployeePayload extends Payload {
  object: Employee;
  expandable: {
    owner: EmployeePayload;
  };
}
