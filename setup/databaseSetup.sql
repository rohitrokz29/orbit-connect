-- create a mysql database
CREATE DATABASE orbit_connect;

-- use mysql database
USE DATABASE orbit_connect;

-- Creating tables 
-- user table to store user data
CREATE TABLE user(
    id VARCHAR(60) PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    name VARCHAR(30),
    password VARCHAR(400)
);

-- meetings table to store meetings data 
CREATE TABLE meetings(
    room_id VARCHAR(60) PRIMARY KEY,
    date DATE,
    organiser_id VARCHAR(60),
    password VARCHAR(400),
    FOREIGN KEY (organiser_id) REFERENCES user(id) ON DELETE SET  NULL
);

