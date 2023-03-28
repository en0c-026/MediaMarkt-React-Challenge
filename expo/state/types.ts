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

export type Parcel = {
  parcelId: string;
  carrier: string;
  employeeId: string;
  delivered?: boolean;
  deliveryDriver?: {
    name: string;
    licensePlate: string;
    signature?: {
      data: string;
      contentType: string;
    };
  };
};

export type List = {
  _id: string;
  name: string;
  parcels: Parcel[];
};

export interface Employee {
  name: string;
  lists: List[];
}
