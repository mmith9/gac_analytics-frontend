/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface DatacronCC {
  ability_3?: number;
  ability_6?: number;
  ability_9?: number;
  stat_limits: StatLimit[];
}
export interface StatLimit {
  stat_id: number;
  stat_min: number;
  stat_max: number;
}
export interface Freq {
  id: number;
  count: number;
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
  battlesCCin?: {
    [k: string]: unknown;
  }[];
  battlesCCout?: {
    [k: string]: unknown;
  }[];
}
export interface GacDataRequest {
  season: GacSeason;
  attackers?: TeamCC;
  defenders?: TeamCC;
  win_conditions?: WinCC;
  cutoff?: number;
}
export interface GacSeason {
  type: string;
  rounds: number[];
  season: number;
  startDate?: string;
  endDate?: string;
}
export interface TeamCC {
  leader?: UnitCC;
  members: UnitCC[];
  datacron?: DatacronCC;
}
export interface UnitCC {
  unit_id: number;
  stat_limits: StatLimit[];
}
export interface WinCC {
  attempt?: number[];
  defenders_start: number[];
  defenders_end: number[];
}
export interface PORow {
  id: number;
  count: number;
  name?: string;
  max_value?: number;
  opt1?: string;
  units?: Freq[];
}
export interface PrecalcObject {
  season: number;
  item_type: string;
  payload: PORow[];
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
export interface UnitFreq {
  name: string;
  image_url: string;
  unit_id: string;
  base_id: string;
  count?: number;
}
