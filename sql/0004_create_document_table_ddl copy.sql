create table flow_document (
   id numeric(9) primary key,
	flow_id numeric(9) references company_flow(flow_id),
	document_name varchar(100) not null,
	file_name varchar(100),
	file_content bytea,
	downloadable boolean
)

CREATE SEQUENCE flow_document_seq START 100;

 insert into flow_document values (nextval('flow_document_seq'), 100, 'Carte de identitate',
 								 null, null, true);
 insert into flow_document values (nextval('flow_document_seq'), 100, 'Cerere eliberare cadastru',
 								 'cerere_eliberare.txt', decode('dacdff', 'hex'), true);