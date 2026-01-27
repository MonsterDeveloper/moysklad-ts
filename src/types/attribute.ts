import type { Entity } from "./entity"
import type { Meta, Metadata } from "./metadata"
import type { Idable } from "./mixins"

export enum AttributeType {
  Time = "time",
  Link = "link",
  String = "string",
  Text = "text",
  File = "file",
  Boolean = "boolean",
  Double = "double",
  Long = "long",
  Contract = "contract",
  Counterparty = "counterparty",
  Project = "project",
  Store = "store",
  Employee = "employee",
  Product = "product",
  CustomEntity = "customentity",
}

interface BaseAttribute extends Idable, Meta<Entity.AttributeMetadata> {
  name: string
  type: AttributeType
  value:
    | boolean
    | string
    | number
    | (Meta<Entity> & {
        name: string
      })
}

export interface TimeAttribute extends BaseAttribute {
  type: AttributeType.Time
  value: string
}

export interface LinkAttribute extends BaseAttribute {
  type: AttributeType.Link
  value: string
}

export interface StringAttribute extends BaseAttribute {
  type: AttributeType.String
  value: string
}

export interface TextAttribute extends BaseAttribute {
  type: AttributeType.Text
  value: string
}

export interface FileAttribute extends BaseAttribute {
  type: AttributeType.File
  value: string
}

export interface BooleanAttribute extends BaseAttribute {
  type: AttributeType.Boolean
  value: boolean
}

export interface DoubleAttribute extends BaseAttribute {
  type: AttributeType.Double
  value: number
}

export interface LongAttribute extends BaseAttribute {
  type: AttributeType.Long
  value: number
}

export interface ContractAttribute extends BaseAttribute {
  type: AttributeType.Contract
  value: Meta<Entity.Contract> & { name: string }
}

export interface CounterpartyAttribute extends BaseAttribute {
  type: AttributeType.Counterparty
  value: Meta<Entity.Counterparty> & { name: string }
}

export interface ProjectAttribute extends BaseAttribute {
  type: AttributeType.Project
  value: Meta<Entity.Project> & { name: string }
}

export interface StoreAttribute extends BaseAttribute {
  type: AttributeType.Store
  value: Meta<Entity.Store> & { name: string }
}

export interface EmployeeAttribute extends BaseAttribute {
  type: AttributeType.Employee
  value: Meta<Entity.Employee> & { name: string }
}

export interface ProductAttribute extends BaseAttribute {
  type: AttributeType.Product
  value: Meta<Entity.Product> & { name: string }
}

export interface CustomEntityAttribute extends BaseAttribute {
  description?: string
  type: AttributeType.CustomEntity
  customEntityMeta: Metadata<Entity.CustomEntityMetadata>
  value: Meta<Entity.CustomEntityMetadata> & { name: string }
}

export type Attribute =
  | TimeAttribute
  | LinkAttribute
  | StringAttribute
  | TextAttribute
  | FileAttribute
  | BooleanAttribute
  | DoubleAttribute
  | LongAttribute
  | ContractAttribute
  | CounterpartyAttribute
  | ProjectAttribute
  | StoreAttribute
  | EmployeeAttribute
  | ProductAttribute
  | CustomEntityAttribute
