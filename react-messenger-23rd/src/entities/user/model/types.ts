export interface User {
  id: string;
  name: string;
  profileImage: string;
}

export interface Friend {
  id: number;
  name: string;
  status: 'read' | 'yet' | 'none';
}
