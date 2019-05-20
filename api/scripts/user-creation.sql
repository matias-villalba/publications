CREATE USER publicationsuser WITH ENCRYPTED PASSWORD 'publicationspass';
GRANT ALL PRIVILEGES ON database publications TO publicationsuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO publicationsuser;