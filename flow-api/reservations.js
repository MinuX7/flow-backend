const cors = require('cors');
const express = require('express');
const { Pool, Client } = require('pg');
const { randomUUID } = require('crypto');
var bodyParser = require('body-parser')
const mailService= require('./mailservice');

const pgConnectionPool = new Pool({
    user: 'cosmind',
    host: 'flow-db.c1eiluwgd9jl.eu-west-1.rds.amazonaws.com',
    database: 'flow',
    password: 'Test1234',
    port: 5432,
  })

module.exports = async function(app) {
    var urlencodedParser = bodyParser.urlencoded({ extended: false });
    app.use(cors());
    app.use(express.json());
    
    app.post('/companies/:companyId/reservations',urlencodedParser, async function(req, res) {
        let reservation = req.body;
        let uuid = randomUUID();
        console.info(reservation);

        const query = {
            text: 'INSERT INTO reservation_event VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9, $10)',
            values: [uuid, reservation.companyId, reservation.flowId, reservation.bookingOfficeId, reservation.reservationStartTime, 
                reservation.firstName, reservation.lastName, reservation.email, reservation.comment, reservation.creationTime ]
        }
        try {
            await pgConnectionPool.query(query);
            return res.json({reservationId: uuid});
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
        
    });

    app.get('/companies/:companyId/reservations', async function(req, res) {
        let companyId = req.params.companyId;
        const query = {
            text: "SELECT a.reservation_id, a.reservation_start_time, b.flow_name FROM reservation_event a, company_flow b " +
                    "WHERE a.flow_id=b.flow_id AND a.company_id=b.company_id AND a.company_id=$1  AND reservation_start_time >= current_date " + 
                    "ORDER BY a.reservation_time desc",
            values: [companyId]
            }
            try {
                result = await pgConnectionPool.query(query);  
                let reserations = result.rows.map(row => {
                    let reservation = {};
                    reservation.reservationId= row.reservation_id;
                    reservation.reservationStartTime = row.reservation_start_time;
                    reservation.flowName = row.flow_name;
                    return reservation;
                });
                res.json(reserations);
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }  
    });

    app.get('/companies/:companyId/bookingOffices/:bookingOffice/reservedSlots', async function(req, res) {
        let companyId = req.params.companyId;
        let bookingOfficeId=req.params.bookingOffice;
        const query = {
            text: "SELECT reservation_start_time FROM reservation_event "+ 
                    "WHERE company_id=$1 AND booking_office_id=$2 ORDER BY reservation_start_time ASC",
            values: [companyId, bookingOfficeId]
        }    
        try {
            let result = await pgConnectionPool.query(query);
            let busySlots = result.rows.map(row => row.reservation_start_time);
            return res.json(busySlots);
        } catch (error) {
            console.error('Eroare');
            console.error(error);
            return res.status(500).send(error);
        }

    });

    app.get('/testEmail', async function (req, res) {
        console.info('Sending email');
        let status = await mailService.sendTestMail();
        console.log(status);
        let message = status? 'Success': 'Error';
        return res.send(message);
    });
}