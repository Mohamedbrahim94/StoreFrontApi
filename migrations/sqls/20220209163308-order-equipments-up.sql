CREATE TABLE order_equipments(
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id  bigint REFERENCES orders(id) NOT NULL ,
    equipment_id bigint REFERENCES equipments(id)

);