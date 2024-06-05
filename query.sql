CREATE TABLE receiver (
	ID VARCHAR(36) NOT NULL PRIMARY KEY,
	NAME VARCHAR(255) NOT NULL,
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE crowdfunding (
	ID VARCHAR(36) NOT NULL PRIMARY KEY,
	RECEIVER_ID VARCHAR(36) NOT NULL,
	TITLE VARCHAR(255) NOT NULL,
	DESCRIPTION TEXT,	
	TOTAL_AMOUNT FLOAT NOT NULL DEFAULT 0,
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE deposit (
	ID VARCHAR(36) NOT NULL PRIMARY KEY,
	CROWDFUNDING_ID VARCHAR(36) NOT NULL,
	PAYER VARCHAR(255),
	AMOUNT FLOAT NOT NULL,
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

alter table crowdfunding
  add constraint FK_RECEIVER_ID
  foreign key (receiver_id) 
  references receiver (id)
  on delete CASCADE;
  
alter table deposit
  add constraint FK_CROWDFUNDING_ID
  foreign key (crowdfunding_id) 
  references crowdfunding (id)
  on delete CASCADE;


create or replace function uuid_trigger() 
   returns trigger 
   language plpgsql
as $$
begin
   if new.id is null or new.id = '' then
      new.id := gen_random_uuid();
   end if;
   return new;
end;
$$;

create or replace function updated_at_trigger() 
   returns trigger 
   language plpgsql
as $$
begin
   new.updated_at := now();
   return new;
end;
$$;

CREATE TRIGGER receiver_uuid_trigger
BEFORE INSERT ON receiver
FOR EACH ROW EXECUTE PROCEDURE uuid_trigger();

CREATE TRIGGER deposit_uuid_trigger
BEFORE INSERT ON deposit
FOR EACH ROW EXECUTE PROCEDURE uuid_trigger();

CREATE TRIGGER crowdfunding_uuid_trigger
BEFORE INSERT ON crowdfunding
FOR EACH ROW EXECUTE PROCEDURE uuid_trigger();

CREATE TRIGGER receiver_updated_at_trigger
BEFORE UPDATE ON receiver
FOR EACH ROW EXECUTE PROCEDURE updated_at_trigger();

CREATE TRIGGER crowdfunding_updated_at_trigger
BEFORE UPDATE ON crowdfunding
FOR EACH ROW EXECUTE PROCEDURE updated_at_trigger();