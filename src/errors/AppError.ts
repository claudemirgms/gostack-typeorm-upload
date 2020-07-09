class AppError {
  public readonly message: string;

  public readonly status: string;

  constructor(message: string, status = '') {
    this.message = message;
    this.status = status;
  }
}

export default AppError;
