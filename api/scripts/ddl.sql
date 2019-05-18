CREATE TABLE authors(
 id SERIAL PRIMARY KEY,
 first_name VARCHAR (100) NOT NULL,
 last_name VARCHAR (100) NOT NULL,
 email VARCHAR (120) NOT NULL,
 birthdate TIMESTAMP with time zone NOT NULL
);

CREATE TABLE publications(
 id SERIAL PRIMARY KEY,
 title VARCHAR (200) NOT NULL,
 body TEXT NOT NULL,
 author_id INTEGER NOT NULL,
 publication_datetime TIMESTAMP with time zone NOT NULL,
 CONSTRAINT publications_author_id_fkey FOREIGN KEY (author_id)
       REFERENCES authors (id) MATCH SIMPLE
       ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE UNIQUE INDEX unique_authors_email ON authors(lower(email));

CREATE INDEX publications_author_id ON publications(author_id);
CREATE INDEX publications_publication_datetime ON publications(publication_datetime);
CREATE UNIQUE INDEX publications_lower_title_and_author_id ON publications((lower(title)), author_id);
