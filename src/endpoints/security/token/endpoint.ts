/**
 * Интерфейс для работы с токенами безопасности
 */
export interface TokenEndpoint {
  /**
   * Создать новый токен доступа
   *
   * @returns Объект с токеном доступа
   */
  create(): Promise<{ access_token: string }>
}
