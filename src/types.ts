export interface TsServerMessage {
  seq: number;
  type: string;
  request_seq?: number;
  success?: boolean;
  message?: any;
  [k: string]: any;
}
