import type { IsEqual, ConditionalKeys, IsEmptyObject } from "type-fest";
import type { Model } from "./model";
import type { RestoreExpandableFieldsOptionality } from "./expand";
import type { ListMeta } from "./metadata";

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetFindResult<M extends Model, E> =
  // ❔ Is expand not defined ..
  IsEqual<E, any> extends true
    
    // 🚫 return default.
    ? M["object"]
    
    // ❔ Is expand empty object ..
    : IsEmptyObject<E> extends true
      
      // 🚫 return default.
      ? M["object"]

      // ❔ Is expand not empty object ..
      : E extends object
        
        // ✅ Expand is defined ..
        ? RestoreExpandableFieldsOptionality<
            M,
            {
              // ℹ️ only map through truthy values (explicitly expanded fields)
              [
                K in keyof E as E[K] extends false | undefined
                  ? never
                  : K
              ]: 
                // ❔ Can the expanded field to be expanded ..
                K extends keyof M["expandable"]
                  
                  // ❔ Does the entity contain expanded field ..
                  ? K extends keyof M["object"]
                    
                    // ❔ Does the expanded field contain a description of the model ..
                    ? M["expandable"][K] extends Model
                      
                      // ❔ Is the expand nested ..
                      ? E[K] extends object
                        
                        // ℹ️ expand option is an object
                        // ⤵️ Recursively falling into a nested expand.
                        ? GetFindResult<M["expandable"][K], E[K]>
                        
                        // ℹ️ expand option is `true`
                        // ❔ Is the entity field a list ..
                        : M["object"][K] extends ListMeta<infer O>
                          
                          // ✅ Expand list field.
                          ? ListMeta<O> & { rows: M["expandable"][K]["object"][] }

                          // ❔ Is the entity field an array ..
                          : NonNullable<M["object"][K]> extends Array<unknown>
                            
                            // ✅ Expand array field.
                            ? M["expandable"][K]["object"][]
                            
                            // ✅ Expand reference field.
                            : M["expandable"][K]["object"]
                      
                      // 🚫 expanded field has't model info
                      : never
                    
                    // 🚫 expanded field has't model info
                    : never
                  
                  // 🚫 there is no expanded field in the model
                  : never;
            }
          > &
            // ℹ️ Merge other model fields except expanded fields
            Omit<M["object"], ConditionalKeys<E, true | object>>
        
        // 🚫 expand not defined
        : M["object"];
