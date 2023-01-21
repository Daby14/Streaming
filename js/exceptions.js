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

//Excepción para indicar si una producción es nula o no es de tipo Production
class ProductionTypeException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Esa production es nula o no es una instancia de Production", fileName, lineNumber);
        this.name = "ProductionTypeException";
    }
}

//Excepción para indicar si un actor es nula o no es de tipo Person
class PersonTypeException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Ese actor/director es nulo o no es una instancia de Person", fileName, lineNumber);
        this.name = "PersonTypeException";
    }
}

//Excepción para indicar si el objeto no existe en el sistema
class IndexOutException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Ese objeto no está registrado", fileName, lineNumber);
        this.name = "IndexOutException";
    }
}

//Excepción para indicar si el objeto es nulo
class NullException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Ese objeto es nulo", fileName, lineNumber);
        this.name = "NullException";
    }
}

//Excepción para indicar que la categoría por defecto no se puede borrar
class DefaultCategoryProductionManagerException extends BaseException {
    constructor(fileName, lineNumber) {
        super("La categoría por defecto no se puede borrar", fileName, lineNumber);
        this.name = "DefaultCategoryProductionManagerException";
    }
}

//Excepción para indicar que la categoría no existe en la producción
class CategoryNotExistsProductionManagerException extends BaseException {
    constructor(fileName, lineNumber) {
        super("La categoría no existe para esa producción", fileName, lineNumber);
        this.name = "CategoryNotExistsProductionManagerException";
    }
}

//Excepción para indicar que el actor no existe en la producción
class ActorNotExistsProductionManagerException extends BaseException {
    constructor(fileName, lineNumber) {
        super("El actor no existe para esa producción", fileName, lineNumber);
        this.name = "ActorNotExistsProductionManagerException";
    }
}

//Excepción para indicar que el director no existe en la producción
class DirectorNotExistsProductionManagerException extends BaseException {
    constructor(fileName, lineNumber) {
        super("El director no existe para esa producción", fileName, lineNumber);
        this.name = "DirectorNotExistsProductionManagerException";
    }
}

class ProductionNotExistsProductionManagerException extends BaseException  {
	constructor(categorie, fileName, lineNumber) {
		let message = (!categorie) ? "La producción no existe" :
			"La producción no existe en la categoría" + categorie.title;
		super(message, fileName, lineNumber);
		this.name = "ProductionNotExistsProductionManagerException";
	}
}

//Exportamos las excepciones para utilizarlas en un archivo externo
export {
    BaseException,
    AbstractException,
    EmptyNameException,
    ExistedException,
    UsernameExistedException,
    EmailExistedException,
    CategorieTypeException,
    UserTypeException,
    ProductionTypeException,
    PersonTypeException,
    IndexOutException,
    NullException,
    DefaultCategoryProductionManagerException,
    CategoryNotExistsProductionManagerException,
    ActorNotExistsProductionManagerException,
    DirectorNotExistsProductionManagerException,
    ProductionNotExistsProductionManagerException
};