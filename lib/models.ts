export interface Week {
  id: string;
  entries: Entry[];
}

export interface Entry {
  id: string;
  baby: string;
  start: Date;
  end: Date;
}

export interface UserData {
  email: string;
  displayName: string;
}
