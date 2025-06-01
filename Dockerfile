# Imagen base de nginx
FROM nginx:alpine

# Elimina archivos default de Nginx (opcional pero limpio)
RUN rm -rf /usr/share/nginx/html/*

# Copia tu proyecto completo al contenedor
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Arranca Nginx
CMD ["nginx", "-g", "daemon off;"]
