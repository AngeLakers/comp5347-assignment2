module.exports={
    idCardReg:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    phoneReg: /^1[3456789]\d{9}$/,
    binaryReg:/^[01]+$/,
    binaryReg1:/^[012]+$/,
    binaryReg2:/^[123]+$/,
    nameReg:/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
}