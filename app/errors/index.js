class BaseError extends Error {
    constructor({
      name,
      message,
      stack,
      action,
      statusCode,
      errorId,
      requestId,
      context,
      errorLocationCode,
      key,
      type,
      databaseErrorCode,
    }) {
      super();
      this.name = name;
      this.message = message;
      this.action = action;
      this.statusCode = statusCode || 500;
      this.errorId = errorId || crypto.randomUUID();
      this.requestId = requestId;
      this.context = context;
      this.stack = stack;
      this.errorLocationCode = errorLocationCode;
      this.key = key;
      this.type = type;
      this.databaseErrorCode = databaseErrorCode;
    }
  }

  export class InternalServerError extends BaseError {
    constructor({ message, action, requestId, errorId, statusCode, stack, errorLocationCode }) {
      super({
        name: 'InternalServerError',
        message: message || 'Um erro interno não esperado aconteceu.',
        action: action || "Informe ao suporte o valor encontrado no campo.",
        statusCode: statusCode || 500,
        requestId: requestId,
        errorId: errorId,
        stack: stack,
        errorLocationCode: errorLocationCode,
      });
    }
  }