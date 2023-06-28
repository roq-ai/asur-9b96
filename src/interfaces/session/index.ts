import { ParticipationInterface } from 'interfaces/participation';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SessionInterface {
  id?: string;
  name: string;
  description?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  participation?: ParticipationInterface[];
  organization?: OrganizationInterface;
  _count?: {
    participation?: number;
  };
}

export interface SessionGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  organization_id?: string;
}
