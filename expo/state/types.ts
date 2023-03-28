export interface State {
  username: string;
}

export interface SetUsernameAction {
  type: "SET_USERNAME";
  payload: string;
}

export interface ResetUsernameAction {
  type: "RESET_USERNAME";
}

export type Action = SetUsernameAction | ResetUsernameAction;

interface Carrier {
  companyName: string;
  driver: string;
  licensePlate: string;
  centerAddress: string;
}

export type Parcel = {
  parcelId: string;
  employeeName: string;
  delivered: boolean;
  carrier?: Carrier;
};

export type List = {
  _id?: string
  name: string;
  parcels: Parcel[];
};

export interface Employee {
  name: string;
  lists: List[];
}
