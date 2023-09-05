// Nav
export interface NavItemInterface {
  page: string;
  route: string;
}

export interface TodoInterface {
  _id: string;
  text: string;
  description: string;
  completed: boolean;
  position: { x: number; y: number };
}

export interface TodoUpdateInterface {
  text?: string;
  description?: string;
  completed?: boolean;
  position?: { x: number; y: number };
}
