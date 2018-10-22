const Promise = require('es6-promise').Promise;

export class DoctorLookUp{
    constructor(issue,name){
        this.issue = issue;
        this.name = name;
    }

    lookUp() {
        // let promise = new Promise((resolve,reject) => {
        //     let request = new XMLHttpRequest();
        //     const url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=9e6a3cec1aeb5d09edb981ba259d03d8&location=wa-seattle&query=${this.issue}`;
        //     request.onload = function() {
        //         if(this.status === 200) {
        //             resolve(request.reponse);
        //         } else {
        //             reject(Error(request.statusText));
        //         }
        //     };
        //     request.open("GET", url, true);
        //     request.send();
        // });
        // return promise;

        //this promise function works
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            //api key doesn't work
            let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${this.issue}&first_name=${this.name}&location=wa-seattle&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      
            request.onload = function () {
              if (this.status === 200) {
                resolve(request.response);
              } else {
                reject(Error(request.statusText));
              }
            };
            request.open("GET", url, true);
            request.send();
          });
    }
}
