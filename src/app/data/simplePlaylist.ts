import { User } from './user';

export class SimplePlaylist {
    public id:string;
    public title: string;
    public isGeneral: boolean;
    public owner: User;
}