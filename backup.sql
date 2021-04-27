SCRIPT BASE DE DATOS

CREATE TABLE public.personas (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	CONSTRAINT personas_pkey PRIMARY KEY (id)
);