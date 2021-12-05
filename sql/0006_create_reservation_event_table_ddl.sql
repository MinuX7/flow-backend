create table reservation_event(
	reservation_id uuid primary key,
	company_id varchar(50) not null references company(company_id),
	flow_id numeric(9) not null references company_flow(flow_id),
	booking_office_id numeric(9) not null references booking_office(id),
	reservation_start_time timestamp not null,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(50) not null,
	comment varchar(2000) not null
)

alter table reservation_event add column reservation_time timestamp not null;