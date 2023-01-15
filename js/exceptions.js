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

//Excepción para indicar si un objeto está registrado
class ExistedException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Ese objeto ya está registrado", fileName, lineNumber);
        this.name = "ExistedException";
    }
}

//Excepción para indicar si el username ya está registrado
class UsernameExistedException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Ese username ya está registrado", fileName, lineNumber);
        this.name = "UsernameExistedException";
    }
}

//Excepción para indicar si el email ya está registrado
class EmailExistedException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Ese email ya está registrado", fileName, lineNumber);
        this.name = "EmailExistedException";
    }
}

//Excepción para indicar si una categoría es nula o no es de tipo Category
class CategorieTypeException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Esa categoría es nula o no es una instancia de Category", fileName, lineNumber);
        this.name = "CategorieTypeException";
    }
}

//Excepción para indicar si un usuario es nulo o no es de tipo User
class UserTypeException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Ese usuario es nulo o no es una instancia de User", fileName, lineNumber);
        this.name = "UserTypeException";
    }
}

//Excepción para indicar si el objeto no existe en el sistema
class IndexOutException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Ese objeto no está registrado", fileName, lineNumber);
        this.name = "IndexOutException";
    }
}