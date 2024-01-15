export const validaEmail = (stringEmail) => {
    const regexEmail = 
    new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return regexEmail.test((stringEmail));
}

export const validaEmpty = (stringEmpty) => {
    return (
        stringEmpty.length > 0
    )
}

export const validaPassword = (stringPassword) => {
    return (
        stringPassword.length > 8
    )
}

export const validaPhone = (stringPhone) => {
    const regexPhone = 
    new RegExp(/^(0\d{9})$/);
    return regexPhone.test((stringPhone));
}

export const validaName = (stringName) => {
    return (
        stringName.length > 0
    )
}

export const validaAddress = (stringAddress) => {
    return (
        stringAddress.length > 0
    )
}

export const validaBirthday = (stringBirthday) => {
    const regexBirthday = 
    new RegExp(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/);

    return regexBirthday.test((stringBirthday));
}