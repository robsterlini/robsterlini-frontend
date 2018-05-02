export const _forms = {
  title: {
    login: `Log In`,
  },
  actions: {
    login: `requestLogin`,
    register: `requestRegisterUser`,
    reset: `requestResetPassword`,
    confirm: `requestConfirmPassword`,
  },
  submit: {
    login: `Log in`,
    register: `Create Account`,
    reset: `Request Reset`,
    confirm: `Set Password`,
  },
};

export const login = {
  email: {
    label: `Email Address`,
    type: `email`,
    errorLabel: `Email`,
    validations: {
      required: true,
      email: true,
    },
  },
  password: {
    label: `Password`,
    type: `password`,
    validations: {
      required: true,
    },
    forgot: true,
  },
};

export const register = {
  email: {
    type: `email`,
    // icon: `carousel`,
    label: `Email Address`,
    errorLabel: `Email`,
    validations: {
      required: true,
      email: true,
    },
  },
  password: {
    label: `Password`,
    type: `password`,
    validations: {
      required: true,
      min: 6,
    },
  },
};

export const reset = {
  email: {
    type: `email`,
    label: `Email Address`,
    errorLabel: `Email`,
    validations: {
      required: true,
      email: true,
    },
  },
};

export const confirm = {
  new_password: {
    label: `Password`,
    type: `password`,
    validations: {
      required: true,
      min: 6,
    },
  },
};

