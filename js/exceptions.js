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

//Excepción para indicar si está vacío el name de VideoSystem
class EmptyNameException extends BaseException {
    constructor(fileName, lineNumber) {
        super("El name de VideoSystem está vacío", fileName, lineNumber);
        this.name = "EmptyNameException";
    }
}

//Excepción para indicar si una categoría está registrada
class CategorieException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Esa categoría ya está registrada", fileName, lineNumber);
        this.name = "CategorieException";
    }
}

//Excepción para indicar si una categoría es nula o no es de tipo Category
class CategorieTypeException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Esa categoría es nula o no es una instancia de Category", fileName, lineNumber);
        this.name = "CategorieTypeException";
    }
}