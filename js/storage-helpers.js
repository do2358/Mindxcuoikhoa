// LocalStorage helper functions with error handling

function safeLocalStorageGet(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error(`Error reading ${key} from localStorage:`, e);
        return defaultValue;
    }
}

function safeLocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error(`Error writing ${key} to localStorage:`, e);
        if (e.name === 'QuotaExceededError') {
            toast({
                title: 'Lỗi',
                message: 'Bộ nhớ trình duyệt đã đầy. Vui lòng xóa dữ liệu cũ.',
                type: 'error',
                duration: 5000
            });
        }
        return false;
    }
}

function getProducts() {
    return safeLocalStorageGet('products', []);
}

function getAccounts() {
    return safeLocalStorageGet('accounts', []);
}

function getCurrentUser() {
    return safeLocalStorageGet('currentuser', null);
}

function setCurrentUser(user) {
    return safeLocalStorageSet('currentuser', user);
}

function updateAccountInStorage(updatedAccount) {
    const accounts = getAccounts();
    const index = accounts.findIndex(acc => acc.phone === updatedAccount.phone);
    if (index !== -1) {
        accounts[index] = updatedAccount;
        return safeLocalStorageSet('accounts', accounts);
    }
    return false;
}
