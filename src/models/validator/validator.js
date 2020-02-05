
const VALIDATORS_PTBR = {
    is: "Palavra inválida para expressão regular", 
    not: "Palavra inválida para expressão regular", 
    isEmail: "{} não é um email válido!", 
    isUrl: "{} não é uma URL válida", 
    isIP:  "{} não é um endereço IP válido!",
    isIPv4: "{} não é um endereço IPv4 válido!", 
    isIPv6: "{} não é um endereço IPv6 válido!",             
    isAlpha: "{} deve conter apenas letras",           
    isAlphanumeric: "{} deve conter apenas caracteres alphanuméricos",     
    isNumeric: "{} deve ser numérico",          
    isInt: "{} deve ser inteiro",             
    isFloat: "{} deve ser um número flutuante",            
    isDecimal: "{} deve ser decimal",          
    isLowercase: "{} deve conter apenas letras minusculas",        
    isUppercase: "{} deve conter apenas letras maiúsculas",       
    notNull: "{} não pode ser nulo",        
    isNull:  "{} deve ser nulo",          
    notEmpty: "{} não pode estar em branco",          
    equals: "{} deve ser igual a {args}", 
    contains: "{} deve conter {args}",          
    notIn: "{} não deve está presente em {args}",  
    isIn: "{} deve está presente em {args}",  
    notContains: "{} não deve conter {args}",       
    len:  "{} deve está entre {args}",       
    isUUID: "{} deve ser um UUID válido",                
    isDate: "{} deve ser uma data válida",           
    isAfter:  "{} deve ser maior que {args}", 
    isBefore: "{} deve ser menor que {args}",  
    max: "{} é maior que o máximo permitido ({args})",    
    min: "{} é menor que o mínimo permitido ({args})",            
    isCreditCard: "{} é um cartão de crédito válido",      
}

export function validatePtBr (rule, value, args){
   return {
        [rule]: {
            args: args,
            msg: VALIDATORS_PTBR[rule].replace('{args}', args.toString()).replace("{}", value)
        }
    }
}

