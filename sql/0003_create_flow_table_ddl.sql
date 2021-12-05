create table company_flow(
	flow_id numeric(9) primary key,
	company_id varchar(20) references company(company_id),
	flow_name varchar(100),
	description varchar(500)
);

CREATE SEQUENCE company_flow_seq START 100;

INSERT INTO company_flow values (nextval('company_flow_seq'), 'primaria-telesti', 'Cerere cadastru', 'Cere pentru eliberare cadastru.');