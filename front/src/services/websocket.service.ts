/**
 * WebSocket Service para comunicação em tempo real
 * Gerencia conexão WebSocket para matchmaking, lobby e chat
 */

import { MatchmakingLobby, LobbyPlayer, ChatMessage, MapRole } from "@/types";

export enum WebSocketEventType {
  // Eventos de conexão
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",

  // Eventos de matchmaking
  QUEUE_JOINED = "queue_joined",
  QUEUE_LEFT = "queue_left",
  MATCH_FOUND = "match_found",

  // Eventos de lobby
  LOBBY_CREATED = "lobby_created",
  LOBBY_UPDATED = "lobby_updated",
  PLAYER_JOINED = "player_joined",
  PLAYER_LEFT = "player_left",
  ROLE_SELECTED = "role_selected",

  // Eventos de chat
  CHAT_MESSAGE = "chat_message",
  MESSAGE_MODERATED = "message_moderated",

  // Eventos de notificação
  NOTIFICATION = "notification",
}

interface WebSocketMessage {
  type: WebSocketEventType;
  data: any;
  timestamp: number;
}

type EventCallback = (data: any) => void;

export class WebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private eventHandlers: Map<WebSocketEventType, EventCallback[]> = new Map();
  private isIntentionalClose = false;

  constructor(url: string = "ws://localhost:8001") {
    this.url = url;
  }

  /**
   * Conecta ao servidor WebSocket
   */
  connect(userId: string, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Adicionar autenticação via query string
        const wsUrl = `${this.url}?userId=${userId}&token=${encodeURIComponent(
          token
        )}`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          this.reconnectAttempts = 0;
          this.emit(WebSocketEventType.CONNECT, { userId });
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            // Erro ao processar mensagem WebSocket
          }
        };

        this.ws.onerror = (error) => {
          this.emit(WebSocketEventType.ERROR, error);
          reject(error);
        };

        this.ws.onclose = (event) => {
          this.emit(WebSocketEventType.DISCONNECT, {
            code: event.code,
            reason: event.reason,
          });

          // Tentar reconectar automaticamente se não foi intencional
          if (!this.isIntentionalClose && this.shouldReconnect()) {
            this.attemptReconnect(userId, token);
          }
        };
      } catch (error) {
        console.error("❌ Erro ao conectar WebSocket:", error);
        reject(error);
      }
    });
  }

  /**
   * Desconecta do servidor WebSocket
   */
  disconnect() {
    this.isIntentionalClose = true;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Verifica se deve tentar reconectar
   */
  private shouldReconnect(): boolean {
    return this.reconnectAttempts < this.maxReconnectAttempts;
  }

  /**
   * Tenta reconectar ao servidor
   */
  private attemptReconnect(userId: string, token: string) {
    this.reconnectAttempts++;

    setTimeout(() => {
      this.connect(userId, token).catch((error) => {
        // Falha ao reconectar
      });
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  /**
   * Envia mensagem para o servidor
   */
  send(type: WebSocketEventType, data: any) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const message: WebSocketMessage = {
      type,
      data,
      timestamp: Date.now(),
    };

    this.ws.send(JSON.stringify(message));
  }

  /**
   * Processa mensagem recebida
   */
  private handleMessage(message: WebSocketMessage) {
    this.emit(message.type, message.data);
  }

  /**
   * Registra callback para um tipo de evento
   */
  on(event: WebSocketEventType, callback: EventCallback) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(callback);
  }

  /**
   * Remove callback de um evento
   */
  off(event: WebSocketEventType, callback: EventCallback) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(callback);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Emite evento para callbacks registrados
   */
  private emit(event: WebSocketEventType, data: any) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach((callback) => callback(data));
    }
  }

  /**
   * Métodos específicos de matchmaking
   */

  // Entrar na fila de matchmaking
  joinQueue(mode: string, region: string, mmr: number) {
    this.send(WebSocketEventType.QUEUE_JOINED, { mode, region, mmr });
  }

  // Sair da fila de matchmaking
  leaveQueue() {
    this.send(WebSocketEventType.QUEUE_LEFT, {});
  }

  // Selecionar função no lobby
  selectRole(lobbyId: string, role: MapRole) {
    this.send(WebSocketEventType.ROLE_SELECTED, { lobbyId, role });
  }

  // Enviar mensagem no chat
  sendChatMessage(lobbyId: string, message: string) {
    this.send(WebSocketEventType.CHAT_MESSAGE, { lobbyId, message });
  }

  // Sair do lobby
  leaveLobby(lobbyId: string) {
    this.send(WebSocketEventType.PLAYER_LEFT, { lobbyId });
  }

  /**
   * Verifica status da conexão
   */
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  /**
   * Obtém estado da conexão
   */
  getReadyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }
}

// Singleton instance
let wsInstance: WebSocketService | null = null;

/**
 * Obtém instância singleton do WebSocketService
 */
export function getWebSocketService(): WebSocketService {
  if (!wsInstance) {
    const wsUrl =
      process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8001";
    wsInstance = new WebSocketService(wsUrl);
  }
  return wsInstance;
}

/**
 * Hook React para usar WebSocket
 */
export function useWebSocket() {
  const ws = getWebSocketService();

  return {
    connect: ws.connect.bind(ws),
    disconnect: ws.disconnect.bind(ws),
    send: ws.send.bind(ws),
    on: ws.on.bind(ws),
    off: ws.off.bind(ws),
    joinQueue: ws.joinQueue.bind(ws),
    leaveQueue: ws.leaveQueue.bind(ws),
    selectRole: ws.selectRole.bind(ws),
    sendChatMessage: ws.sendChatMessage.bind(ws),
    leaveLobby: ws.leaveLobby.bind(ws),
    isConnected: ws.isConnected.bind(ws),
  };
}
