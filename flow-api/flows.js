
const fs = require('fs');
var cors = require('cors');
const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'cosmind',
  host: 'flow-db.c1eiluwgd9jl.eu-west-1.rds.amazonaws.com',
  database: 'flow',
  password: 'Test1234',
  port: 5432,
})


module.exports = async function(app) {
    app.use(cors());
    let rawdata = fs.readFileSync('./data/flows.json');
    let flows = JSON.parse(rawdata);
    app.get('/flows', function(req, res){
        res.json(flows);
    });

    app.get('/companies', async function(req, res){
        console.info("Fetching companies");
        app.use(cors());
        const query = {
            text: 'SELECT * FROM company'
        }
        const data  = await pool.query(query);
        let rows= data.rows;
        let companies = rows.map(row =>{
            let company = {};
            company.companyId = row.company_id;
            company.companyName=row.company_name;
            company.description = row.description;
            company.addressLine= row.address_line;
            company.zipCode= row.zip_code;
            company.city = row.city;
            company.county= row.county;
            return company;
        });
        return res.json(companies);
        // .catch(e => console.error(e));
    });

    app.get('/companies/:companyId/flows', async function(req, res) {
        app.use(cors());
        var companyId = req.params.companyId;
        const query = {
            text: 'SELECT * FROM company_flow WHERE company_id=$1',
            values: [companyId]
        }
        let data = await pool.query(query);
        let rows= data.rows;
        let flows =  rows.map( (row) =>  {
            let flow = {};
            flow.flowId = row.flow_id;
            flow.companyId= row.company_id;
            flow.name = row.flow_name;
            flow.description = row.description;
            flow.documents=[];
            return flow;
        });
        for (const flowObj of flows) {
            const query1 = {
                text: 'SELECT * FROM flow_document WHERE flow_id=$1',
                values: [flowObj.flowId]
            }
            let data1 = await pool.query(query1); 
            let rows1 =  data1.rows;
            flowDocuments = rows1.map(row1 => {
                let flowDocument = {};
                flowDocument.id= row1.id;
                flowDocument.flowId = row1.flow_id;
                flowDocument.documentName = row1.document_name;
                flowDocument.downloadable = row1.downloadable;
                return flowDocument;
            });
            flowObj.documents = flowDocuments;
        }
        return res.json(flows);
    });

    app.get('/companies/:companyId/bookingOffice', async function(req, res) {
        var companyId = req.params.companyId;
        var flowId = req.query.flowId;
        const query = {
            text: 'SELECT * FROM booking_office WHERE company_id=$1 AND id = (SELECT booking_office_id FROM booking_office_flow WHERE flow_id=$2)',
            values: [companyId, flowId]
        }
        let data = await pool.query(query);
        let rows= data.rows;
        bookkingOffices = rows.map(row => {
            let bookingOffice = {};
            bookingOffice.id= row.id;
            bookingOffice.name = row.name;
            bookingOffice.description = row.description;
            bookingOffice.slotDuration = row.slot_duration;
            bookingOffice.officeStartTime = row.office_start_time;
            bookingOffice.officeEndTime = row.office_end_time;
    
            return bookingOffice;
        });
        return res.json(bookkingOffices);
    });

}