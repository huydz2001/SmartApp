// validate sdt
export const isValidNumberPhone = (numberPhone) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    return numberPhone.match(regexPhoneNumber) ? true : false;
}

//validate password
export const isValidPass = (passWord) => {
    return passWord.length >= 6;
}