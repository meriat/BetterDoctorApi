import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {DoctorLookUp} from './doctor.js';

$(document).ready(function() {

    $("#formInput").submit(function(event){
        event.preventDefault();
        let issue = $("#issue").val();
        let name = $("#name").val();

        let doctorLookUp = new DoctorLookUp(issue,name);
        let promise = doctorLookUp.lookUp();
        promise.then(function(response) {
          $("#doctorList").empty();
          $("#errors").empty();
            let body = JSON.parse(response);
            console.log(body);
            if (body.data.length === 0) {
              $("#errors").text("There were no doctors.");
            }else{
              for(let i=0; i<10; i++) {
                
                let first_name = body.data[i].profile.first_name;
                let last_name = body.data[i].profile.last_name;
                let address = `${body.data[i].practices[0].visit_address.street}
                 ${body.data[i].practices[0].visit_address.city}`;
                let phone = body.data[i].practices[0].phones[0].number;
                let acceptPatients = body.data[i].practices[0].accepts_new_patients;
                  $("#doctorList").append(`
                  <li> 
                  <p>Name: ${first_name + last_name}</p>
                  <p>Address: ${address}</p>
                  <p>Phone: ${phone} </p>
                  <p>Accepting new patients:${acceptPatients} </p>
                  </li><hr/>`);

            }
              
              }
            },
            function(error){
              $(".errors").text(`There was an error processing your request. Error Msg: ${error}`);
            });
          });
        });

