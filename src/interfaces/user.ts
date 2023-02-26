import UserStatus from '../enums/user_status';

export default interface User {
    id: string | null;
    username: string;
    intro: string;
    status?: UserStatus;
  }
  