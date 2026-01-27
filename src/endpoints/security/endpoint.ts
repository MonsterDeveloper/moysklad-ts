import type { TokenEndpoint } from "./token"

/**
 * Интерфейс для работы с безопасностью
 */
export interface SecurityEndpoint {
  /**
   * Токены безопасности
   */
  token: TokenEndpoint
}
