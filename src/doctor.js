const Promise = require('es6-promise').Promise;

export class DoctorLookUp{
    constructor(issue, name){
        this.issue = issue;
        this.name = name;
    }

    lookUp() {
        let promise = new Promise((resolve,reject) => {
            let request = new XMLHttpRequest();
            let url = ``;
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