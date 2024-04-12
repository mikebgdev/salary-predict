FROM python:3.11.2

# Copia las dependencias
COPY requirements.txt .

# Instala las dependencias de requirements.txt
RUN pip install -r requirements.txt

# Copiar la carpeta al contenedor
COPY . .

# Exponer puerto 5000
EXPOSE 5000

# Ejecutar cuando inicie el contenedor
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]

