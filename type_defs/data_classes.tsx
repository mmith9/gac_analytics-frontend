/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface CC {
  type: string;
  value: string;
}
export interface GacBattle {
  attackers: number[];
  defenders: number[];
  wins: number;
  losses: number;
  avg_banners: number;
  win_percent: number;
}
export interface GacBattleData {
  battles: GacBattle[];
  cc?: CC;
  battlesCCin?: {
    [k: string]: unknown;
  }[];
  battlesCCout?: {
    [k: string]: unknown;
  }[];
}
export interface GacDataRequest {
  season: GacSeason;
  attackers?: Team;
  defenders: Team;
  constraints?: CC[];
  cutoff?: number;
}
export interface GacSeason {
  type: string;
  rounds: number[];
  season: number;
  startDate?: string;
  endDate?: string;
}
export interface Team {
  leader: Unit;
  members: Unit[];
}
export interface Unit {
  name: string;
  image_url: string;
  unit_id: string;
  base_id: string;
}
