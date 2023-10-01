export interface Payload<T extends object = object> {
  object: T;
  expandable: {
    // in theory, it should be Payload | Payload[] | null instead of unknown
    // but if we do that TypeScript will attempt to compare types recursively
    [ObjectName in string]?: unknown;
  };
  orderable?: string;
}
