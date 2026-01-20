# Dockerfile para Backend (API Python)
FROM ubuntu:22.04

# Instala dependências básicas
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    apt-get clean

# Cria diretório da aplicação
WORKDIR /app

# Copia arquivos do backend para o container
COPY ../python-api /app

# Instala dependências Python
RUN pip3 install --upgrade pip && \
    pip3 install -r /app/requirements.txt || true

# Expõe a porta padrão da API (ajuste conforme necessário)
EXPOSE 8000

# Comando para rodar a API (ajuste conforme seu entrypoint)
CMD ["python3", "-m", "app.main"]
