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
