export  function validateEmail(email) {
    if (!email?.value) {
        return 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email?.value)) {
        return 'Email is not valid.';
    } else {
        return '';
    }
}

export  function validateName(name) {
    if (!name?.value) {
        return 'Name is required.';
    } else {
        return '';
    }
}

export  function validatePassword(password) {
    if (!password?.value) {
        return 'Password is required.';
    } else if (password?.value.length < 8) {
        return 'Password must be at least 8 characters.';
    } else {
        return '';
    }
}

export  function validateRepeatPassword(repatepw) {
    if (!repatepw?.value) {
        return 'Repeat password is required.';
    } else if (password?.value !== repatepw?.value) {
        return 'Passwords do not match.';
    } else {
        return '';
    }
}