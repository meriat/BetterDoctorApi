const Promise = require('es6-promise').Promise;

export class DoctorLookUp{
    constructor(name,issue){
        this.issue = issue;
        this.name = name;
    }

    lookUp() {
        let promise = new Promise((resolve,reject) => {
            let request = new XMLHttpRequest();
            const url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&location=wa-seattle&query=${this.issue}&name=${this.name}`;
            request.onload = function() {
                if(this.status === 200) {
                    resolve(request.reponse);
                } else {
                    reject(Error(request.statusText));
                }
            };
            request.open("GET", url, true);
            request.send();
        });
        return promise;
    }
}
