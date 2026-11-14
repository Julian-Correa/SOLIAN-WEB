export class ContactApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ContactApiError';
    this.status = status;
  }
}
