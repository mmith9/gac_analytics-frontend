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
export interface DCSLRow {
  id: number;
  count: number;
  long_desc: string;
}
export interface DCSeasonList {
  season: number;
  l3: DCSLRow[];
  l6: DCSLRow[];
  l9: DCSLRow[];
}
export interface DatacronCC {
  side?: string;
  ability_3?: number;
  ability_6?: number;
  ability_9?: number;
  stat?: number;
  stat_limit?: number;
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
  cc?: DatacronCC | CC;
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
  defenders?: Team;
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
export interface PopularLeaders {
  attackers: number[];
  defenders: number[];
}
