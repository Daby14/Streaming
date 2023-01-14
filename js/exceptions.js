//Clase Padre de la que heredan todas las excepciones
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException);
        }
    }
}

//Excepción para indicar si es abstracta la clase Production
class AbstractException extends BaseException {
    constructor(fileName, lineNumber) {
        super("La clase Production es abstracta", fileName, lineNumber);
        this.name = "AbstractException";
    }
}