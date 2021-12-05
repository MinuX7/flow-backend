create table booking_office (
	id numeric(9) primary key,
	name varchar(50) not null,
	company_id varchar(50) references company(company_id),
	description varchar(200),
		unique (name, company_id)
)

CREATE SEQUENCE booking_office_seq START 100;

INSERT INTO booking_office values(nextval('booking_office_seq'), 'Ghiseu Finante 1', 'primaria-telesti', '');

INSERT INTO booking_office values(nextval('booking_office_seq'), 'Ghiseu Finante 2', 'primaria-telesti', '');

INSERT INTO booking_office values(nextval('booking_office_seq'), 'Ghiseu Cadastru', 'primaria-telesti', '');

create table booking_office_flow (
	booking_office_id numeric(9) references booking_office(id),
	flow_id numeric(9) references company_flow(flow_id),
	description varchar(200),
	primary key (booking_office_id,flow_id)
)