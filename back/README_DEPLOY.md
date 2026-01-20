# Documentação de Deploy Backend Dockerizado

## Estrutura
- Backend Python (API)
- MongoDB
- MySQL
- ngrok (exposição segura)

## Pré-requisitos
- Docker e Docker Compose instalados
- Conta no ngrok (https://ngrok.com/)

## Passos para Deploy

1. **Configurar variáveis de ambiente:**
   - Copie `.env.example` para `.env` e preencha o `NGROK_AUTHTOKEN`.

2. **Build e start dos serviços:**
   ```sh
   cd back
   docker compose up --build
   ```

3. **Acessar o backend:**
   - O ngrok irá gerar uma URL pública (ver logs do container ngrok ou acesse http://localhost:4040).
   - Use essa URL no frontend (Vercel) para consumir a API.

4. **Persistência de dados:**
   - Dados do MongoDB e MySQL são salvos em volumes Docker (`mongo_data`, `mysql_data`).
   - Os dados permanecem mesmo após reiniciar/remover containers.

5. **Parar os serviços:**
   ```sh
   docker compose down
   ```

## Comandos úteis
- Ver logs do ngrok: `docker logs rankedhonor-ngrok`
- Ver containers ativos: `docker ps`
- Acessar painel web do ngrok: http://localhost:4040

## Migração para Cloud
- Basta subir os mesmos containers em uma VM na AWS/Azure.
- Recomenda-se migrar volumes de dados para persistência.
- Pode-se expor a porta da API diretamente, dispensando ngrok.

---

**Dúvidas ou problemas? Consulte este README ou abra uma issue.**
