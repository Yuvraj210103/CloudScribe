export interface INote {
  title: string;
  content: string;
  images: string[];
  tag?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IUser {
  fullName: string;
  email: string;
  isActive: boolean;
}
