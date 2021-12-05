create table company (
    company_id varchar(50) primary key,
    company_name varchar(100) not null,
    description varchar(500),
    address_line varchar (200),
    zip_code varchar(20),
    city varchar(50),
    county varchar (30)
)