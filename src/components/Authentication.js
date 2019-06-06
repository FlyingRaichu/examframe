import jwtDecode from 'jwt-decode';
class Authentication {

    constructor() {
        this.apiUrl = 'http://localhost:8080/';

        this.Login = this.Login.bind(this);
        this.fetch = this.fetch.bind(this);
        this.gProfile = this.gProfile.bind(this)
    }

    Login(username, password) {

        return this.fetch(this.apiUrl + 'users/Login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            if(res.token) {
                this.sToken(res.token)
            }
            return Promise.resolve(res);
        })
    }

    Loggedin() {

        const token = this.gToken()
        return !!token && !this.Expiredtokencheck(token)
    }

    Expiredtokencheck(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    Logout() {

        localStorage.removeItem('token');
    }

    sToken(idToken) {

        localStorage.setItem('token', idToken)
    }


    gToken() {

        return localStorage.getItem('token')
    }

    gProfile() {

        return jwtDecode(this.gToken());
    }


    fetch(url, options) {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }


        if (this.Loggedin()) {
            headers['Authorization'] = 'Bearer ' + this.gToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }
}
export default Authentication;
