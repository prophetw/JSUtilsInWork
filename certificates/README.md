```bash
# generate self-signed certificate
openssl genrsa -out server.key 2048
openssl req -new -sha256 -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

```