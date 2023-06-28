import { UserInterface } from 'interfaces/user';
import { SessionInterface } from 'interfaces/session';
import { GetQueryInterface } from 'interfaces';

export interface ParticipationInterface {
  id?: string;
  user_id?: string;
  session_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  session?: SessionInterface;
  _count?: {};
}

export interface ParticipationGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  session_id?: string;
}
